const { OpenAI } = require('openai');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const CHATGPT_API_KEY = process?.env?.CHATGPT_API_KEY;

// connect openai to specific api key (generate from openai account)
const openai = new OpenAI({
    apiKey: CHATGPT_API_KEY,
  });

// ChatGPT input to get JSON response
router.post('/create-outfit-from-chatgpt', (req, res) => {
    const requestFacts = req.body.prompt;
    openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        temperature: 0.6,
        messages: [{"role": "user", "content": "Generate an outfit for me in JSON format with 'shirt' 'pants' and 'shoes' using the facts that " + requestFacts}],
    }).then((gptResponse) => {
        console.log(gptResponse.choices[0].message);
        responseStr = gptResponse.choices[0].message;
        res.send(JSON.parse(responseStr));
    }).catch((err) => {
        console.error("Unable to retrieve ChatGPT response", err);
        res.send({message: "Failure", reason: err}).status(500);
    });
});

module.exports = router;