const mongoose = require('./mongodb-connection');

mongoose.set('useFindAndModify', false);

class DB {
    async query(query, projection= {}, options = {}){
        return await this._model.find(query, projection, options);
    }

    async queryOne(query, projection= {}, options = {}){
        return await this._model.findOne(query, projection, options)
    }

    async queryAndReturnId(query, projection= {}, options = {}){
        let q =  await this._model.findOne(query, projection, options).lean()
        return q._id;
    }

    async queryAndReturnbyEmail(query, projection= {}, options = {}){
        let user =  await this._model.findOne(query, projection, options).lean()
        return user;
    }
    
    async findById(id){       
        return await this._model.findById(id);
    }

    async update(query, dataObject){
        return await this._model.findOneAndUpdate(query, dataObject, {new: true})
    }

    async exists(query){
        if(! await this.queryOne(query))
            return false;
        return true;
    }

    async add(document){
        let data= this._model(document);        
        return await data.save();
    }

    async addAndReturnID(document){
        let data= this._model(document);   
        let id = await data.save((err) => {
            console.log('id' + data._id);
            id=data._id})
        
        console.log('before return')
        return id
    }

    async deleteOne(filter){
        return await this._model.deleteOne(filter);
    }

}

module.exports = DB;

