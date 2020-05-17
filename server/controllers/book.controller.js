const book = require('../models/Book');
const userModel = require('../models/User');

const express = require('express');
express.json();

class BookController{

    async getAllBooks(req,res){
        let query= {} ; //buscar por nombre o uid
        let options = {} //página o limit
        let projection = "" //que quiero ver de la información
        let docs = await book.getBooks(query, projection, options);
        let books = JSON.parse(JSON.stringify(docs));

        res.send(books);
    }

    async getAllBooksbyEmail(req,res){
        let userEmail = req.query.email;
        console.log(userEmail);
        let userDB = await userModel.getUsersByEmail(userEmail);
        let booksId = userDB.books;
        let books = [];

        for (let id of booksId) 
            books.push(await book.getBookById(id))

        res.json(books);
    }

        //metodo de controlador para id
    async getByid(req,res){
        let book_id = req.params.id;
        let docs = await book.getBookById(book_id=book_id);
        let books = JSON.parse(JSON.stringify(docs));
        res.json(books);
    }

            //metodo de controlador para id
    async getByTitle(req,res){
        let title = req.query.title;
        let docs = await book.getBookByTitle(title=title);
        let books = JSON.parse(JSON.stringify(docs));
        if(books.length != 0)
            res.json(books);
        else
            res.status(404).json('Book not found');
    }

    async getByAuthor(req , res) {
        let author = req.query.author;
        let docs = await book.getBookByAuthor(author=author);
        let books = JSON.parse(JSON.stringify(docs));
        if(books.length != 0)
            res.json(books);
        else
            res.status(404).json('Book not found')
    }

    async addBook(req,res) {
        let br = {
            title: req.body.title,
            author: req.body.author,
            imageUrl: req.body.imageUrl
        }
        let addedBook = await book.add(br);
        res.json(addedBook);
    }

    async deleteBook(req, res) {
        let bookTitle = req.query.title;
        try {
            let bookDelete = await book.deleteBook(bookTitle);
            res.send('Book deleted');
        } catch (error) {
            console.log(error)
        }
    }
}

const bookController = new BookController();

module.exports = bookController;