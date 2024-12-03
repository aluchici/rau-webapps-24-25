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

function openModal() {
    document.getElementById('addBookModal').style.display = 'block';
}

document.getElementById('discardButton').onclick = function() {
    document.getElementById('addBookModal').style.display = 'none';
    clearInputs();
};

document.getElementById('modalAddButton').onclick = function() {
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    const cover = document.getElementById('coverPreview').style.backgroundImage.slice(5, -2);

    if (title && author && cover) {
        addBook(title, author, cover);
        document.getElementById('addBookModal').style.display = 'none';
        clearInputs();
    } else {
        alert("Please fill in all fields and select a cover image.");
    }
};

function addBook(title, author, cover) {
    const currentlyReadingSection = document.getElementById('currently-reading');
    const bookList = currentlyReadingSection.querySelector('.book-list');

    const newBookElement = document.createElement('div');
    newBookElement.classList.add('book');
    newBookElement.innerHTML = `
        <img src="${cover}" alt="${title} Cover">
        <div class="book-details">
            <p class="bookTitle">${title}</p>
            <p class="bookAuthor">by ${author}</p>
            <button class="delete-button" onclick="deleteBook('${title}')">X</button>
        </div>
    `;

    bookList.appendChild(newBookElement);
    saveToLocalStorage(title, author, cover);
    checkNoBooks();
}


function saveToLocalStorage(title, author, cover) {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    books.push({ title, author, cover, type: 'currentlyReading' });
    localStorage.setItem('books', JSON.stringify(books));
}


function loadBooksFromLocalStorage() {
    const storedBooks = JSON.parse(localStorage.getItem('books'));
    if (storedBooks && storedBooks.length > 0) {
        storedBooks.forEach(book => {
            if (book.type === 'currentlyReading') {
                addBook(book.title, book.author, book.cover);
            }
        });
    } else {
        document.getElementById('noBooksMessage').style.display = 'block';
    }
}

function clearInputs() {
    document.getElementById('book-Title').value = '';
    document.getElementById('book-Author').value = '';
    document.getElementById('coverPreview').style.backgroundImage = 'none';
    document.getElementById('coverPreview').textContent = 'Cover Image Here';
}

document.getElementById('coverPreview').onclick = function() {
    document.getElementById('coverInput').click();
};

document.getElementById('coverInput').onchange = function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('coverPreview').style.backgroundImage = `url(${e.target.result})`;
            document.getElementById('coverPreview').textContent = '';
            document.getElementById('coverPreview').style.backgroundSize = 'cover';
        }
        reader.readAsDataURL(file);
    }
};

window.onload = function() {
    loadBooksFromLocalStorage();
    checkNoBooks();
};

function checkNoBooks() {
    const bookList = document.querySelector('.book-list');
    const message = document.getElementById('noBooksMessage');

    if (bookList && message) {
        if (bookList.children.length === 0) {
            message.style.display = 'block';
        } else {
            message.style.display = 'none';
        }
    } else {
        console.error('book-list or noBooksMessage not found.');
    }
}

function deleteBook(title) {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const updatedBooks = books.filter(book => book.title !== title);
    localStorage.setItem('books', JSON.stringify(updatedBooks));

    const bookList = document.querySelector('.book-list');
    const bookElements = bookList.querySelectorAll('.book');
    bookElements.forEach(book => {
        if (book.querySelector('.bookTitle').textContent === title) {
            bookList.removeChild(book);
        }
    });

    checkNoBooks();
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
        // Нулиране на стойностите на полетата в модалния прозорец
        document.getElementById("book-Title").value = ""; // Заглавие на книгата
        document.getElementById("book-Author").value = ""; // Автор на книгата
        document.getElementById("book-review").value = ""; // Ревю на книгата
        modalCover.src = ""; // Изчистване на корицата на книгата
    
        // Затваряне на модалния прозорец
        reviewModal.style.display = "none";
    });    

    window.addEventListener("click", (event) => {
        if (event.target === reviewModal) {
            reviewModal.style.display = "none";
        }
    });
});

const addReviewButton = document.getElementById("addReviewButton");

document.addEventListener("DOMContentLoaded", () => {
    // Дефиниране на променливата за модалния прозорец
    const reviewModal = document.getElementById("review-modal");
    const addReviewButton = document.getElementById("addReviewButton");
    const modalCover = document.getElementById("modal-book-cover");

    addReviewButton.addEventListener("click", () => {
        // Взимане на стойностите от полетата
        const title = document.getElementById("book-Title").value;
        const author = document.getElementById("book-Author").value;
        const reviewText = document.getElementById("book-review").value;
        const coverSrc = modalCover.src;

        // Проверка дали всички полета са попълнени
        if (!title || !author || !reviewText || !coverSrc) {
            alert("Please fill in all fields and select a book cover.");
            return;
        }

        // Създаване на ново ревю
        const reviewSection = document.createElement("div");
        reviewSection.classList.add("review-section");

        reviewSection.innerHTML = `
            <div class="review-header">
                <img src="./images/360_F_266724172_Iy8gdKgMa7XmrhYYxLCxyhx6J7070Pr8.jpg" alt="User Profile" class="user-profile">
                <span class="user-name">Test User</span>
            </div>
            <div class="review-body">
                <img src="${coverSrc}" alt="Book Cover" class="book-cover">
                <div class="book-details">
                    <h3 class="book-title">${title}</h3>
                    <p class="review-text">
                        '${reviewText}'
                        <a href="#" class="more-link">More...</a>
                    </p>
                </div>
            </div>
            <div class="review-footer">
                <span class="like-count" style="display: none;">
                    <img src="./images/25297.png" alt="Thumbs Up" class="thumb-icon">
                    <span class="like-number">1</span>
                </span>
                <a href="#" class="action-link like-link" onclick="likeReview(this)">Like</a>
                <a href="#" class="action-link">Comment</a>
            </div>
            <div class="comment-section">
                <img src="./images/360_F_266724172_Iy8gdKgMa7XmrhYYxLCxyhx6J7070Pr8.jpg" alt="Your Profile" class="comment-profile">
                <input type="text" placeholder="Leave a comment..." class="comment-input">
            </div>
        `;

        // Добавяне на ревюто към контейнера
        const reviewsContainer = document.getElementById("reviews-container");

        // Проверяваме дали вече има ревюта
        if (reviewsContainer) {
            reviewsContainer.prepend(reviewSection);

            // Показваме контейнера с ревютата, ако преди това е бил скрит
            reviewsContainer.style.display = "block";
        } else {
            console.error("No container found with the ID 'reviews-container'");
        }

        // Нулиране на стойностите в полетата
        document.getElementById("book-Title").value = "";
        document.getElementById("book-Author").value = "";
        document.getElementById("book-review").value = "";
        modalCover.src = "";

        // Затваряне на модалния прозорец
        reviewModal.style.display = "none";
    });

    // Ако няма ревюта, скриваме контейнера
    window.addEventListener("load", () => {
        const reviewsContainer = document.getElementById("reviews-container");
        if (reviewsContainer && reviewsContainer.children.length === 0) {
            reviewsContainer.style.display = "none";
        }
    });
});
