const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {createOAuthUser} = require("../middleware/Auth.middleware");
const Post = mongoose.model("Post");

router.post("/create", createOAuthUser, (req, res) => {
  if (!req?.body?.userID) {
      res.status(400);
      res.send({
          message: "No userID provided"
      });
      return;
  }
    if (!req?.body?.outfit) {
        res.status(400);
        res.send({
            message: "No outfit provided"
        });
        return;
    }
  console.debug("Creating community post", req.body);
  const postData = new Post();
  postData.title = req.body.title;
  postData.text = req.body.text;
  postData.user = new mongoose.Types.ObjectId(req.body.userID);
  postData.outfit = new mongoose.Types.ObjectId(req.body.outfit);
  postData
    .save()
    .then((result) => {
      console.debug("Saved post database object");
      res
        .send({
          message: "successfully created new post database object",
          result: result,
        })
        .status(200);
    })
    .catch((error) => {
      console.error("Unable to save post database object", error);
      res.send({ message: "failure", reason: error }).status(500);
    });
});

router.get("/community", createOAuthUser, (req, res) => {
  Post.find()
    .populate('user')
    .populate({
            path: 'outfit',
            populate: {
            path: 'shirt',
            model: 'Clothing'
        }
    })
    .populate({
            path: 'outfit',
            populate: {
            path: 'pants',
            model: 'Clothing'
        }
    })
    .populate({
            path: 'outfit',
            populate: {
            path: 'shoes',
            model: 'Clothing'
        }
    })
    .then((result) => {
      res.send({ result: result }).status(200);
    })
    .catch((error) => {
      console.error("Unable to fetch post database object", error);
      res.send({ message: "failure", reason: error }).status(500);
    });
});

module.exports = router;
