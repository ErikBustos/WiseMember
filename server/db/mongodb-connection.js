const mongoose = require('mongoose');
const config = require('../config/config');

const mongoDBURL= config.dbUrl;  //"mongodb+srv://admin:admin@cluster0-j1xbs.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(mongoDBURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() =>{
    console.log("Connected to database");
}).catch((err)=>{
    console.log("Not connected to database", err);
});

module.exports = mongoose;