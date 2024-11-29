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
            <p class="book-title">${title}</p>
            <p class="book-author">by ${author}</p>
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
    document.getElementById('bookTitle').value = '';
    document.getElementById('bookAuthor').value = '';
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
        if (book.querySelector('.book-title').textContent === title) {
            bookList.removeChild(book);
        }
    });

    checkNoBooks();
}

document.addEventListener("DOMContentLoaded", () => {
    // Избери всички корици на книги
    const bookCovers = document.querySelectorAll(".book img");
    const modal = document.getElementById("review-modal");
    const modalCover = document.getElementById("modal-book-cover");
    const closeModalButton = document.querySelector(".modal .close");

    // Добави обработчик на събития за всяка корица
    bookCovers.forEach((cover) => {
        cover.addEventListener("click", () => {
            // Промени `src` на модалната корица
            modalCover.src = cover.src;
            // Покажи модалния прозорец
            modal.style.display = "block";
        });
    });

    // Затваряне на модалния прозорец
    closeModalButton.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Скриване на модала при клик извън него
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
