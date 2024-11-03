// Like Review Function
function likeReview(link) {
    const likeCount = link.previousElementSibling; // Get the previous element (the span)
    const likeNumber = likeCount.querySelector('.like-number');

    if (likeCount.style.display === "none") {
        likeCount.style.display = "inline-flex"; // Show the thumbs-up and the number
        likeNumber.textContent = 1; // Set the number to 1
        link.textContent = "Dislike"; // Change the text to "Dislike"
    } else {
        likeCount.style.display = "none"; // Hide the thumbs-up and the number
        link.textContent = "Like"; // Change the text back to "Like"
    }
}

// Open Modal
function openModal() {
    document.getElementById('addBookModal').style.display = 'block';
}

// Close Modal on Discard Button
document.getElementById('discardButton').onclick = function() {
    document.getElementById('addBookModal').style.display = 'none';
    clearInputs(); // Clear inputs
};

// Handle the Add Button Click
document.getElementById('modalAddButton').onclick = function() {
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    const cover = document.getElementById('coverPreview').style.backgroundImage.slice(5, -2);

    if (title && author && cover) {
        addBook(title, author, cover); // Call the function to add the book
        document.getElementById('addBookModal').style.display = 'none'; // Close the modal
        clearInputs(); // Clear inputs
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
    saveToLocalStorage(title, author, cover); // Save book to local storage
    checkNoBooks(); // Check if there are no books
}


function saveToLocalStorage(title, author, cover) {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    books.push({ title, author, cover, type: 'currentlyReading' }); // Добави типа тук
    localStorage.setItem('books', JSON.stringify(books));
}


function loadBooksFromLocalStorage() {
    const storedBooks = JSON.parse(localStorage.getItem('books'));
    if (storedBooks && storedBooks.length > 0) {
        storedBooks.forEach(book => {
            if (book.type === 'currentlyReading') { // Увери се, че добавяш само книги от 'currentlyReading'
                addBook(book.title, book.author, book.cover);
            }
        });
    } else {
        document.getElementById('noBooksMessage').style.display = 'block';
    }
}


// Clear inputs
function clearInputs() {
    document.getElementById('bookTitle').value = '';
    document.getElementById('bookAuthor').value = '';
    document.getElementById('coverPreview').style.backgroundImage = 'none';
    document.getElementById('coverPreview').textContent = 'Cover Image Here';
}

// File input for cover
document.getElementById('coverPreview').onclick = function() {
    document.getElementById('coverInput').click();
};

document.getElementById('coverInput').onchange = function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('coverPreview').style.backgroundImage = `url(${e.target.result})`;
            document.getElementById('coverPreview').textContent = ''; // Clear the text
            document.getElementById('coverPreview').style.backgroundSize = 'cover'; // Ensure it covers the area
        }
        reader.readAsDataURL(file);
    }
};

window.onload = function() {
    loadBooksFromLocalStorage();
    checkNoBooks(); // Check if there are no books on initial load
};

function checkNoBooks() {
    const bookList = document.querySelector('.book-list');
    const message = document.getElementById('noBooksMessage');

    if (bookList && message) { // Ensure elements exist
        if (bookList.children.length === 0) {
            message.style.display = 'block'; // Show message
        } else {
            message.style.display = 'none'; // Hide message
        }
    } else {
        console.error('book-list or noBooksMessage not found.');
    }
}

function deleteBook(title) {
    // Remove from local storage
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const updatedBooks = books.filter(book => book.title !== title);
    localStorage.setItem('books', JSON.stringify(updatedBooks));

    // Remove from the DOM
    const bookList = document.querySelector('.book-list');
    const bookElements = bookList.querySelectorAll('.book');
    bookElements.forEach(book => {
        if (book.querySelector('.book-title').textContent === title) {
            bookList.removeChild(book);
        }
    });

    checkNoBooks(); // Check if there are no books
}
