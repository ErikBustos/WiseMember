const router = require('express').Router();
const bookController = require('../controllers/book.controller');
const clippingController = require('../controllers/clippings.controller');

router.get('/api/books', (req, res) =>{
    if(req.query.title) {
        bookController.getByTitle(req,res);
    } else if(req.query.author){
        bookController.getByAuthor(req, res);
    } else {
        bookController.getAllBooks(req, res);
    }
});

router.get('/api/userBooks', (req,res) => {
    bookController.getAllBooksbyEmail(req,res)
})

router.get('/api/userClippings', (req,res) => {
    clippingController.getAllClippingsbyEmail(req,res)
})

router.post('/api/bookAdd', (req,res) => {
    if(req.body.title && req.body.author){
        bookController.addBook(req,res)
    } 
    else {
        res.status(400).send('Missing some body data');
    }
});

router.delete('/api/deleteBook', (req,res) => {
    if(req.query.title){
        bookController.deleteBook(req, res);
    }
    else res.status(400).send('Missing title');
})

module.exports = router;
