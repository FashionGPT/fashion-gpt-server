const mongoose = require('mongoose');

let OutfitSchema = new mongoose.Schema({
    // user who created the outfit
    userID: {
        type: String
    },
    // whether an outfit is marked as favorite by the user
    isFavorite: {
        type: Boolean
    },
    // database reference to clothing object of shirt
    shirt: {
        type: String
    },
    // database reference to clothing object of pants
    pants: {
        type: String
    },
    // database reference to clothing object of shoes
    shoes: {
        type: String
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
});

mongoose.model('Outfit', OutfitSchema);
