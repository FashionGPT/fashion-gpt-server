const mongoose = require('mongoose');

let ClothingSchema = new mongoose.Schema({
    // name of the clothing (ex: "Flannel Shirt")
    name: {
        type: String
    },
    // type of the clothing (ex: "Shirt", "Pant", "Shoes", etc.)
    type: {
        type: String
    },
    // link to amazon
    amazonLink: {
        type: String
    },
    // link to image of the clothing
    imageUrl: {
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
