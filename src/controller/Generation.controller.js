const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Clothing = mongoose.model("Clothing");
const Outfit = mongoose.model("Outfit");
const axios = require("axios");
const {createOAuthUser} = require("../middleware/Auth.middleware");

module.exports = router;

router.post("/outfit", createOAuthUser, async (req, res) => {
  const fetchEntireOutfit = async (prompt) => {
    console.debug(prompt);
    const response = await axios.post(
      "http://localhost:8081/api/v1/ChatGPT/create-outfit-from-chatgpt",
      {
        prompt: prompt,
      },
        {
          headers: {
            "user": req?.headers?.user || "{}"
          }
        }
    );
    return response.data;
  };
  const fetchGoogleData = async (item) => {
    console.debug("Fetching google shopping data for", item);
    try {
      const response = await axios.post(
          "http://localhost:8081/api/v1/GoogleShopping/clothing-shopping-data",
          {
            item: item,
          },
          {
            headers: {
              "user": req?.headers?.user || "{}"
            }
          }
      );
      // console.debug("Got inline shopping results", response.data.inline_shopping_results);
      return {
        thumbnail: response.data?.shopping_results[0].thumbnail,
        url: response.data?.shopping_results[0].link,
      };
    } catch (err) {
      console.error("Unable to fetch clothing shopping data", err);
      return undefined;
    }
  };

  const outfit = await fetchEntireOutfit(req.body.prompt);
  const clothing = {};
  for (const [key, value] of Object.entries(outfit)) {
    const data = await fetchGoogleData(value);
    await new Promise(r => setTimeout(r, 1000));
    if (!data) {
      res.status(500).send({message: "Unable to fetch clothing shopping data"});
      console.error("Shopping data", data);
    }
    const c = new Clothing();
    c.name = value;
    c.amazonLink = data.url;
    c.imageUrl = data.thumbnail;
    c.type = key.substring(0, 1).toUpperCase() + key.substring(1);
    let clothingObject;
    try {
      clothingObject = await c.save();
      console.debug("Saved clothing object");
    } catch (error) {
      console.error("Unable to save clothing object", error);
      res.send({ message: "failure", reason: error }).status(500);
    }
    clothing[key] = clothingObject;
  }

  const o = new Outfit();
  o.shirt = new mongoose.Types.ObjectId(clothing["shirt"]._id);
  o.pants = new mongoose.Types.ObjectId(clothing["pants"]._id);
  o.shoes = new mongoose.Types.ObjectId(clothing["shoes"]._id);
  o.userID = req.body.userID;
  o.save()
    .then((result) => {
      console.debug("Saved outfit object");
      result.shirt = clothing["shirt"];
      result.pants = clothing["pants"];
      result.shoes = clothing["shoes"];
      console.debug(result);
      res
        .send({
          message: "successfully created new outfit object",
          result,
        })
        .status(200);
    })
    .catch((error) => {
      console.error("Unable to save outfit object", error);
      res.send({ message: "failure", reason: error }).status(500);
    });
});
