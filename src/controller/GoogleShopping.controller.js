const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const axios = require('axios');
const SERP_API_KEY = process.env.SERP_API_KEY;

router.post('/clothing-shopping-data', (req, res) => {
    const itemName = encodeURIComponent(req.body.item);
    const googleShoppingAPIURL = `https://serpapi.com/search.json?engine=google_shopping&q=${itemName}&location=Austin,+Texas,+United+States&hl=en&gl=us&api_key=${SERP_API_KEY}`;
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: googleShoppingAPIURL,
        headers: { }
      };
      
      axios.request(config)
      .then((response) => {
        res.send(response.data);
      })
      .catch((error) => {
        console.error("Unable to retrieve clothing image data", error);
        res.send({message: "failure", reason: error}).status(500);
      });
});

module.exports = router;