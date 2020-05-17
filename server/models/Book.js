const mongoose = require('../db/mongodb-connection');
const DB = require('../db/DB');

class Book extends DB{
    constructor(){
        super();
        this.schema = new mongoose.Schema({
            title: String,
            author: String,
            imageUrl: String
/*              _id: {
                type: Number,
                unique: true
            },
            title: {
                type: String,
                required: true
            },
            author: {
                type: String,
                required: true
            },
            imageUrl: {
                type: String,
                required: true
            } */

        });

        this._model = mongoose.model('Books', this.schema);
    }

    async getBooks(query, projection = "", options = {}){
        return await super.query({});
    }

    async getBookById(book_id, projection = "", options= {}){
        return await super.queryOne({ '_id': book_id });
    }

    async getBookByTitle(title, projection = "", options= {}){
        return await super.query({ 'title': new RegExp(title, 'i') });
    }

    async getBookByAuthor(author, projection = "", options= {}){
        return await super.query({ 'author': new RegExp(author, 'i') });
    }

    async exists(conditions){
        let doc = await super.exists(conditions);
        return doc;
    }

    async add(document){
        return await super.add(document);
    }

    async deleteBook(title) {
        return await super.deleteOne( {'title': title });
    }
}

let book = new Book();

module.exports = book;