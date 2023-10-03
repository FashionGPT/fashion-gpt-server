const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = mongoose.model('Post');


router.post('/create', (req, res) => {
    const postData = new Post();
    postData.title = req.body.title;
    postData.text = req.body.text;
    postData.user = new mongoose.Types.ObjectId(req.body.user);
    postData.outfit = new mongoose.Types.ObjectId(req.body.outfit);
    postData.save().then((result) => {
        console.debug("Saved post database object")
        res.send({message: "successfully created new post database object", result: result}).status(200);
    }).catch((error) => {
        console.error("Unable to save post database object", error);
        res.send({message: "failure", reason: error}).status(500);
    });
});





module.exports = router;


