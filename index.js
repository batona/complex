/**
 * @file This file contains the implementation of a CRUD server using Express and Mongoose.
 * @description The server provides endpoints for creating, reading, updating, and deleting books from a MongoDB database.
 */

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/mybookdb");

/*schema*/
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
});

/*model*/
const Book = mongoose.model('Book', bookSchema);

/*CRUD*/
app.get('/books', async (req, res) => {
    /**
     * Get all books from the database.
     * @returns {Array} An array of book objects.
     */
    const books = await Book.find();
    res.json(books);
});

app.post('/books', async (req, res) => {
    /**
     * Create a new book in the database.
     * @param {Object} req.body - The book object to be created.
     * @returns {Object} The created book object.
     */
    const book = new Book(req.body);
    await book.save();
    res.json(book);
});

app.put('/books/:id', async (req, res) => {
    /**
     * Update a book in the database.
     * @param {string} req.params.id - The ID of the book to be updated.
     * @param {Object} req.body - The updated book object.
     * @returns {Object} The updated book object.
     */
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    res.json(book);
});

app.delete('/books/:id', async (req, res) => {
    /**
     * Delete a book from the database.
     * @param {string} req.params.id - The ID of the book to be deleted.
     * @returns {Object} A message indicating that the book has been deleted.
     */
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted' });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});