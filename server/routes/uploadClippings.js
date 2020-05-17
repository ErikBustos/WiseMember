const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const userModel = require('../models/User');
const bookModel = require('../models/Book');
const clippingModel = require('../models/Clipping');

let upload = multer({dest: '../public/uploads'})

router.post('/uploadc', async (req,res) =>{
    let { token } = req.body;
    //console.log(token);
    let userEmail = token.email;
    let userDB = await userModel.getUsersByEmail(userEmail);
    console.log('user DB: ' + userDB)
    console.log('userdb books: ' + userDB.picture +userDB.name); 
    console.log('books: ' + typeof userDB)
    if (userDB.books) {
        books = userDB.books
    } else
        books = []
    console.log(books);    
    books.push('4','5','6')
    let filter = { email: userEmail };
    let update = { books: ['7','8'] }
    userDB = await userModel.update(filter, update);
    console.log('user DB updated: ' + userDB)

    res.send('this is uploadc');
})

router.post('/uploadClipping', upload.single('file'), async (req, res) =>{
    console.log('upload clipping')
    let userEmail = req.query.email;
    console.log(userEmail)
    if(!req.file){
        res.send({
            status: false,
            message: 'No file uploaded'
        })
    } else {
        let fileName = req.file.filename;
        let data = fs.readFileSync(`../public/uploads/${fileName}`, 'utf8');
        fs.unlinkSync(`../public/uploads/${fileName}`)
        let {clippings , books} = getClippingsData(data);
        let idArray = await getBooksIdArray(books)
        let clippingIdArray = await getClippingsIdArray(clippings);
        
        //let userDB = await userModel.getUsersByEmail(userEmail);
        //userDB.books = idArray;

        let filter = { email: userEmail };
        let update = { books: idArray,
                        clippings:clippingIdArray  };
        let userDb = await userModel.update(filter, update)

        res.status(200).json({message: 'data upploaded'});
    }
})

function getClippingsData(data){
    let bookSet = new Set();
    let authorSet = new Set();

    let clippings = [];
    let clipping = {
        author: '',
        quote: '',
        book: '',
        date: '',
        position: ''
    };
    
    let lines = data.split("\n");

    for(i of lines){
        if(i.includes('(') && i.length < 60 ){ //author Line
            let arr = i.split('(');
            clipping.author = arr[arr.length-1].replace(')', '').replace(/\r/, '');
            clipping.book = arr[0].trim();

            bookSet.add(clipping.book)
            authorSet.add(clipping.author)
        }
        else if(i.includes('|')){ //date and position
            clipping.position = i.split('|')[0].replace(/[^\d.-]/g, '').substring(1);
            clipping.date = i.split('|')[1].split(',')[1];
        }
        else if(i.length > 2 && !i.includes('===')){ //quote
            clipping.quote= i.replace(/\r/, '');
        }
        else if(i.includes('===')){ //separator
            if(clipping.quote !== '')
                clippings.push(clipping);
            clipping =  {
                author: '',
                quote: '',
                book: '',
                date: '',
                position: ''
            };  
        }

    }

    let books = getBooksArray(bookSet, authorSet);


    return {
            clippings: clippings,
            books: books
            }
}

function getBooksArray(bookSet, authorSet) {
    let books = [];
    let book = {
        title: '',
        author: '',
        imageUrl: 'https://www.mobileread.com/forums/attachment.php?attachmentid=111264&d=1378642555'
    }

    let titleArray = [...bookSet];
    let authorArray = [...authorSet];

    while(titleArray.length != 0) {
        book.title = titleArray.shift();
        book.author = authorArray.shift();
        books.push(Object.assign({}, book));
    }

    return books;
}

async function getBooksIdArray(books) {
    let idArray = [];
    for(book of books) {
        await bookModel.add(book)
        idArray.push(await bookModel.queryAndReturnId({title: book.title}))
    }
    return idArray;   
}

async function getClippingsIdArray(clippings) {
    let idArray = [];
    for(clipping of clippings) {
        await clippingModel.add(clipping)
        idArray.push(await clippingModel.queryAndReturnId({quote: clipping.quote}))
    }
    return idArray;   
}

module.exports = router;

/* 
let title= '';
for(i of data){
    if(i === '(' ){
        titles.add(title);
        title = '';
    } else if(i === ')'){
        authors.add(title)
        title = '';
    } else if(i === '\n'){
        title = '';
    } else if (i === '/"/'){
        quotes.add(title);
        title = '';
    }
    else{
        title = title.concat(i);
    }


    
    for(i of lines){
        if(i.includes('(')){ //author Line
            //console.log('author Line');
            //console.log(i.split('(')[1].replace(')', ''))
            clipping.author = i.split('(')[1].replace(')', '')
            clipping.title = i.split('(')[0].trim()
        }
        else if(i.includes('|')){ //date and position
            //console.log('date')
            clipping.position = i.split('|')[0].replace(/[^\d.-]/g, '').substring(1)
            clipping.date = i.split('|')[1].split(',')[1].trim()
        }
        else if(i.includes('===')){

            console.log('separator')
        }
        else if(i.length > 2)
            console.log('quote') //checar si es empty
        else if(i.includes('==='))
            console.log('separator')   
        else console.log('empty space')
    }
} */