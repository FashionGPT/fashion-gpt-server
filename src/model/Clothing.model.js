const mongoose = require("mongoose");

let ClothingSchema = new mongoose.Schema({
    // name of the clothing (ex: "Flannel Shirt")
    name: {
        type: String,
        required: true
    },
    // type of the clothing (ex: "Shirt", "Pant", "Shoes", etc.)
    type: {
        type: String,
        enum: ["Shirt", "Pants", "Accessories", "Shoes"],
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

mongoose.model("Clothing", ClothingSchema);
