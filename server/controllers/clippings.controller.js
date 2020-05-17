const clippingModel = require('../models/Clipping');
const userModel = require('../models/User');

const express = require('express');
express.json();

class ClippingController {

    async getAllClippingsbyEmail(req,res){
        let userEmail = req.query.email;
        console.log(userEmail);
        let userDB = await userModel.getUsersByEmail(userEmail);
        console.log(userDB)
        let clippingsId = userDB.clippings;
        console.log(clippingsId)
        let clippings = [];

        for(let id of clippingsId)
            clippings.push(await clippingModel.getClippingById(id))

        res.json(clippings);
    }
    
}

const clippingController = new ClippingController();

module.exports = clippingController;