/**
 * Event listener that triggers when the DOM content is loaded.
 * Attaches event handlers to buttons.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Знаходимо кнопки по їх id
    const readBtn = document.getElementById("readBtn");

    // Додаємо обробники подій для кнопок
    readBtn.addEventListener("click", readBooks);
});

/**
 * Creates a new book by sending a POST request to the server.
 * @async
 */
async function createBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const response = await fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, author })
    });
    readBooks();
}

/**
 * Retrieves and displays the list of books by sending a GET request to the server.
 * @async
 */
async function readBooks() {
    const response = await fetch('http://localhost:3000/books');
    const books = await response.json();
    const table = document.getElementById('booksTable');
    let content = '';
    books.forEach(book => {
        content += `
            <tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>
                    <button onclick="updateBook('${book._id}')">Редагувати</button>
                    <button onclick="deleteBook('${book._id}')">Видалити</button>
                </td>
            </tr>
            `;
    });
    table.innerHTML = content;
}

/**
 * Updates a book by sending a PUT request to the server.
 * @async
 * @param {string} id - The ID of the book to be updated.
 */
async function updateBook(id) {
    const title = prompt('Enter new title:');
    const author = prompt('Enter new author:');
    const response = await fetch(`http://localhost:3000/books/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, author })
    });
    readBooks();
}

/**
 * Deletes a book by sending a DELETE request to the server.
 * @async
 * @param {string} id - The ID of the book to be deleted.
 */
async function deleteBook(id) {
    const response = await fetch(`http://localhost:3000/books/${id}`, {
        method: 'DELETE'
    });
    readBooks();
}
