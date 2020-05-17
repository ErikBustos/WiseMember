const express = require('express');
const mongoose = require('./db/mongodb-connection');
const cookieSession = require('cookie-session');
const cors = require('cors');
const passport = require('passport');
const fs = require('fs');

require('./config/passport-setup');

let app = express();


const booksRouter = require('./routes/booksRouter');
const uploadClipRouter = require('./routes/uploadClippings');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/userRouter');

app.use(cors()); //evita errores de cross origin
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

app.use(cookieSession({
    maxAge: 24 * 60 *60 * 1000,
    keys:['clave']
   }))


app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname+ '/public'));

app.use(uploadClipRouter);
app.use(booksRouter);
app.use(authRouter);
app.use(userRouter);

app.post('/posttest',  (req,res) =>{
    console.log('wu')
    console.log('body: ' + req.body.imageUrl)
    res.json(req.body)
});

app.post('/authtest',  (req,res) =>{
    let {token, hola} = req.body;
    console.log(token)
    console.log('body: ' + req.body + hola)
    res.json({'ok':1})
});


app.get('*', (req,res) => res.sendFile(__dirname + '/public/index.html') );

app.listen(3000,() => {
    console.log('Example app listening on port 3000!');
});
  
module.exports = app;