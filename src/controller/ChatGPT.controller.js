const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const openai = require('openai');
const key = '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';

// connect openai to specific api key (generate from openai account)
openai.configure({
    apiKey: apiKey,
});

// ChatGPT input to get JSON response
router.post('/create-outfit-from-chatgpt', (req, res) => {
    const requestFacts = req.body.prompt;
    openai.ChatCompletion.create({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": "Generate an outfit for me in JSON format with 'shirt' 'pants' and 'shoes' using the facts that " + requestFacts}],
    }).then((gptResponse) => { //JSON.parse(gptResponse)
        res.send(gptResponse);
    }).catch((err) => {
        console.error("Unable to retrieve ChatGPT response", error);
        res.send({message: "Failure", reason: error}).status(500);
    });
    

    // TODO ABOVE
    const dummyData = new DummyData();
    dummyData.field1 = req.body.field1;
    dummyData.field2 = req.body.field2;
    dummyData.save().then((result) => {
        console.debug("Saved dummy database object")
        res.send({message: "successfully created new dummy database object", result: result}).status(200);
    }).catch((error) => {
        console.error("Unable to save dummy database object", error);
        res.send({message: "failure", reason: error}).status(500);
    });
});

module.exports = router;