const mongoose = require('../db/mongodb-connection');
const DB = require('../db/DB');

class User extends DB {
    constructor() {
        super();
        this.schema = new mongoose.Schema({
            name : String,
            email: String,
            picture: String,
            given_name: String,
            books: [String],
            clippings: [String]
        });

        this._model = mongoose.model('Users', this.schema);
    }

    async getUsers(query, projection = "", options = {}){
        return await super.query({});
    }

    async exists(conditions){
        let doc = await super.exists(conditions);
        return doc;
    }
    
    async addUser(document){
        return await super.add(document);
    }

    async getUsersByEmail(email) {
        return await super.queryAndReturnbyEmail({ 'email': new RegExp(email, 'i')})
    }

    async getUsersByName(name) {
        return await super.query({ 'name': new RegExp(name, 'i')})
    }

    async deleteUser(userId) {
        return await super.deleteOne( {'_id': userId });
    }

    async update(filter, update){
        return await super.update(filter, update)
    }
}


let user = new User();

module.exports = user;