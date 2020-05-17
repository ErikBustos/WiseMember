const userModel = require('../models/User');
const express = require('express');
express.json();

class UserController {

    async getUsers(req,res){
        res.json(await userModel.getUsers());
    }

    async getByName(req, res) {
        let name = req.query.name;
        let users = await userModel.getUsersByName(name);
        res.json(users);
    }

    async getByEmail(req,res) {
        let email = req.query.email;
        let users = await userModel.getUsersByEmail(email);
        res.json(users);
    }

    async deleteUser(req,res) {
        let userId = req.query.id;
        try {
            let userdelete = await userModel.deleteUser(userId);
            res.send('user deleted');
        } catch (error) {
            console.log(error);
        }
    }
    
}

const userController = new UserController();

module.exports = userController;