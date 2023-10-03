const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Clothing = mongoose.model('Clothing');
const Outfit = mongoose.model('Outfit');

router.get('/clothing-feed', (req, res) => {
    Outfit.find()
    .sort({createdAt: -1})
    .then((result) => {
        console.debug("Retrieved all Clothing in timeline view");
        res.send({result: result}).status(200);
    }).catch((error) => {
        console.error("Unable to retrieve all clothing objects", error);
        res.send({message: "failure", reason: error}).status(500);
    });
});

module.exports = router;
