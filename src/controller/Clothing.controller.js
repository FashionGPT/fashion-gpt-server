const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Clothing = mongoose.model('Clothing');
const Outfit = mongoose.model('Outfit')



// running query on clothing generation by user id
router.post('/get-outfit',(req, res) => {
    Outfit.find({
        userID: new mongoose.Types.ObjectId(req.body.userID)
    }).then((result) => {
        res.send(result).status(200);
    }).catch((error) => {
        console.error("Unable to retrieve all the clothings", error);
        res.send({message: "failure", reason: error}).status(500);
    });
});


module.exports = router;