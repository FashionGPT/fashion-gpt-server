const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Outfit = mongoose.model('Outfit');

router.post('/outfits-for-user', (req, res) => {
    Outfit.find({
        userID: new mongoose.Types.ObjectId(req.body.userID)
    })
    .populate('shirt')
    .populate('pants')
    .populate('shoes')
    .sort({createdAt: -1})
    .then((result) => {
        console.debug("Retrieved all outfits for user");
        res.send({result: result}).status(200);
    }).catch((error) => {
        console.error("Unable to retrieve all outfits for user", error);
        res.send({message: "failure", reason: error}).status(500);
    });
});

router.get('/clothing-feed', (req, res) => {
    Outfit.find()
    .populate('shirt')
    .populate('pants')
    .populate('shoes')
    .sort({createdAt: -1})
    .then((result) => {
        console.debug("Retrieved all Clothing in timeline view");
        res.send({result: result}).status(200);
    }).catch((error) => {
        console.error("Unable to retrieve all clothing objects", error);
        res.send({message: "failure", reason: error}).status(500);
    });
});

router.post('/get-favorites', (req, res) => {
    Outfit.find({
        isFavorite : true,
        userID: new mongoose.Types.ObjectId(req.body.userID)
    }).then((result) => {
        console.debug("Retrieved all favorite outfits from the user");
        res.send({result: result}).status(200);
    }).catch((error) => {
        console.error("Unable to retrieve all favorite outfits from the user", error);
        res.send({message: "failure", reason: error}).status(500);
    });
});

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