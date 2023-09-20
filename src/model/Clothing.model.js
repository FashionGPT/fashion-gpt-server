const mongoose = require('mongoose');

let ClothingSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    isFavorite: {
        type: Boolean
    },
    shirt: {
        type: String
    },
    shirtLink: {
        type: String
    },
    shirtImageURL: {
        type: String
    },
    pants: {
        type: String
    },
    pantsLink: {
        type: String
    },
    pantsImageURL: {
        type: String
    },
    shoes: {
        type: String
    },
    shoesLink: {
        type: String
    },
    shoesImageURL: {
        type: String
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
});

mongoose.model('Clothing', ClothingSchema);
