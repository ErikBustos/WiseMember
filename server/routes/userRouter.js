const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.get('/api/users', (req,res)=>{
    if(req.query.name) {
        userController.getByName(req, res);
    } else if (req.query.email) {
        userController.getByEmail(req,res);
    } else{
        userController.getUsers(req,res)
    }
})

router.delete('/api/deleteUser', (req,res)=>{
    if(req.query.id){
        userController.deleteUser(req, res);
    }
    else res.status(400).send('Missing id');
})

module.exports = router;
