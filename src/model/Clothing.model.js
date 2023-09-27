const mongoose = require("mongoose");

let ClothingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["T-Shirt", "Pants", "Accessories", "Shoes"],
    required: true,
  },
  amazonUrl: {
    type: String,
  },
});

mongoose.model("Clothing", ClothingSchema);
