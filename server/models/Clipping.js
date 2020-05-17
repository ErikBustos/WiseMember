const mongoose = require('../db/mongodb-connection');
const DB = require('../db/DB');

class Clipping extends DB{
    constructor(){
        super();
        this.schema = new mongoose.Schema({
            author: String,
            quote: String,
            book: String,
            date: String,
            position: String
        });

        this._model = mongoose.model('Clippings', this.schema);
    }

    async getClippings(query, projection = "", options = {}){
        return await super.query({});
    }

    async getClippingById(book_id, projection = "", options= {}){
        return await super.queryOne({ '_id': book_id });
    }

    async getClippingByBook(book, projection = "", options= {}){
        return await super.query({ 'book': new RegExp(book, 'i') });
    }

    async getClippingByAuthor(author, projection = "", options= {}){
        return await super.query({ 'author': new RegExp(author, 'i') });
    }

    async exists(conditions){
        let doc = await super.exists(conditions);
        return doc;
    }

    async add(document){
        return await super.add(document);
    }

}

let clipping = new Clipping();

module.exports = clipping;