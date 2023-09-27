const mongoose = require('mongoose');

let OutfitSchema = new mongoose.Schema({
    // user who created the outfit
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    // whether an outfit is marked as favorite by the user
    isFavorite: {
        type: Boolean,
        default: false
    },
    // database reference to clothing object of shirt
    shirt: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clothing"
    },
    // database reference to clothing object of pants
    pants: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clothing"
    },
    // database reference to clothing object of shoes
    shoes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clothing"
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});

mongoose.model('Outfit', OutfitSchema);