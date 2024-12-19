// Функция за Like/Dislike на ревю
function likeReview(link) {
    const likeCount = link.previousElementSibling;
    const likeNumber = likeCount.querySelector('.like-number');

    if (likeCount.style.display === "none") {
        likeCount.style.display = "inline-flex";
        likeNumber.textContent = 1;
        link.textContent = "Dislike";
    } else {
        likeCount.style.display = "none";
        link.textContent = "Like";
    }
}

// Функция за добавяне на нова книга
async function addBook(title, author, coverImage) {
    try {
        const response = await fetch("http://localhost:5001/books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                author: author,
                cover_image: coverImage
            })
        });

        const data = await response.json();
        if (response.ok) {
            alert("Book added successfully!");
            fetchBooks(); // Обновяване на списъка с книги
        } else {
            console.error("Failed to add book:", data.error);
        }
    } catch (error) {
        console.error("Error adding book:", error);
    }
}

// Функция за показване на ревюто
function createReviewSection(review) {
    if (!Array.isArray(review)) {
        console.error('Expected an array but received:', review);
        return;
    }
    if (review.length === 0) {
        console.log('No reviews to display.');
        return;
    }

    const reviewSection = document.createElement("div");
    reviewSection.classList.add("review-section");

    review.forEach(item => {
        const displayReviewText = item.review.length > 30 ? item.review.substring(0, 30) + "..." : item.review;
        const moreLink = item.review.length > 30 ? `<a href="#" class="more-link" onclick="showFullReview(this, '${item.review}')">More...</a>` : '';

        reviewSection.innerHTML += `
            <div class="review-card">
                <div class="review-header">
                    <img src="./images/user-profile.jpg" alt="User Profile" class="user-profile">
                    <span class="user-name">${item.user}</span>
                </div>
                <div class="review-body">
                    <img src="${item.cover_image}" alt="Book Cover" class="book-cover">
                    <div class="book-details">
                        <h3 class="book-title">${item.title}</h3>
                        <p class="review-text"> '${displayReviewText}' ${moreLink} </p>
                    </div>
                </div>
                <div class="review-footer">
                    <span class="like-count" style="display: none;">
                        <img src="./images/thumbs-up.png" alt="Thumbs Up" class="thumb-icon">
                        <span class="like-number">1</span>
                    </span>
                    <a href="#" class="action-link like-link" onclick="likeReview(this)">Like</a>
                    <a href="#" class="action-link">Comment</a>
                </div>
            </div>`;
    });

    return reviewSection;
}

// Function to delete a review
window.deleteReview = (event) => {
    const reviewSection = event.target.closest(".review-section");
    const reviewId = reviewSection.dataset.id; // Assuming each review section has a data-id attribute with the review ID

    // Send DELETE request to backend
    fetch(`http://localhost:5001/reviews/${reviewId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            console.log('Review deleted successfully');
            reviewSection.remove(); // Remove from DOM
            const reviewsContainer = document.getElementById("reviews-container");
            if (reviewsContainer && reviewsContainer.children.length === 0) {
                reviewsContainer.style.display = "none"; // Hide container if no reviews left
            }
        } else {
            console.error('Failed to delete review:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error deleting review:', error);
    });
};

// Функция за изпращане на ревю към бекенда
function saveReviewToBackend(review) {
    fetch('http://localhost:5001/reviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(review)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            fetchReviews(); // Refresh reviews after saving
        } else {
            console.error('Failed to save review:', data.error);
        }
    })
    .catch(error => {
        console.error('Error saving review:', error);
    });
}

// Пример за свързване на функцията с бутон
document.getElementById('modalAddButton').addEventListener('click', () => {
    console.log("Add button clicked"); // Проверка дали бутонът е натиснат
    collectReviewData(); // Извикваме функцията за събиране на данни
});

// Функция за събиране на данни от формата
function collectReviewData() {
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    const cover = document.getElementById('coverPreview').style.backgroundImage; // Може да е image URL, ако е избрана картинка
    const review = document.getElementById('bookReview').value;

    // Проверка за валидност на въведените данни
    if (!title || !author || !review) {
        console.error("All fields must be filled out!");
        alert("Please fill out all fields.");
        return; // Прекратяваме функцията, ако липсват данни
    }

    const newReview = {
        title: title,
        author: author,
        cover: cover,
        review: review
    };

    console.log("Review Data:", newReview); // Проверка на събраните данни

    saveReviewToBackend(newReview); // Записване на ревюто в бекенд
}

// Пример за свързване на функцията с бутон
document.getElementById('modalAddButton').addEventListener('click', collectReviewData);

// Функция за извличане на ревютата от бекенда
function fetchReviews() {
    fetch('http://localhost:5001/reviews')
    .then(response => response.json())
    .then(data => {
        if (Array.isArray(data)) {
            displayReviews(data); // Call display function with fetched data
        } else {
            console.error('Data from server is not an array:', data);
        }
    })
    .catch(error => {
        console.error('Error fetching reviews:', error);
    });
}

// Call fetchReviews when DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
    fetchReviews(); // Fetch reviews on page load
});

// Функция за показване на ревютата на страницата
function displayReviews(reviews) {
    const reviewsContainer = document.getElementById('reviews-container');
    if (!reviewsContainer) {
        console.error('reviews-container element not found.');
        return;
    }
    reviewsContainer.innerHTML = '';  // Изчистване на предишните ревюта
    reviews.forEach(review => {
        if (!review.title || !review.author || !review.review) {
            console.warn('Incomplete review data:', review);
            return; // Пропускаме недовършени ревюта
        }
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review');
        reviewElement.innerHTML = `
            <h3>${review.title}</h3>
            <p>Author: ${review.author}</p>
            <p>${review.review}</p>
            <div class="cover" style="background-image: ${review.cover}; width: 80px; height: 120px;"></div>
        `;
        reviewsContainer.appendChild(reviewElement);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const reviewModal = document.getElementById("review-modal");
    const modalCover = document.getElementById("modal-book-cover");
    const closeReviewModalButton = reviewModal.querySelector(".close");
    const discardReviewButton = document.getElementById("discardReviewButton");

    const bookCovers = document.querySelectorAll(".book img");
    bookCovers.forEach((cover) => {
        cover.addEventListener("click", () => {
            modalCover.src = cover.src;
            reviewModal.style.display = "block";
        });
    });

    closeReviewModalButton.addEventListener("click", () => {
        reviewModal.style.display = "none";
    });

    discardReviewButton.addEventListener("click", () => {
        document.getElementById("book-Title").value = "";
        document.getElementById("book-Author").value = "";
        document.getElementById("book-review").value = "";
        modalCover.src = "";
        reviewModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === reviewModal) {
            reviewModal.style.display = "none";
        }
    });
});
