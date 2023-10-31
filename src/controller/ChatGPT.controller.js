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
        temperature: 0.3,
        // messages: [{"role": "user", "content": "Generate clothing that I should wear for the following scenario in JSON format where the 'shirt', 'pants', and 'shoes' are specified: " + requestFacts}],
        messages: [{"role": "user", "content": "Give a JSON object for an outfit following this format: {'shirt':'x', 'pants':'y', 'shoes':'z'} for this scenario: " + requestFacts + ". Replace x, y, and z with respective pieces of clothing."}],
    }).then((gptResponse) => {
        responseStr = gptResponse.choices[0].message.content;
        //console.debug("Chat GPT response", responseStr);
        res.send(JSON.parse(responseStr));
    }).catch((err) => {
        console.error("Unable to retrieve ChatGPT response", err);
        res.send({message: "Failure", reason: err}).status(500);
    });
});

module.exports = router;