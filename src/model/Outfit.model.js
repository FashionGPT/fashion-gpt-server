const mongoose = require("mongoose");

const OutfitSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  accessories: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clothing",
  },
  shirt: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clothing",
  },
  pants: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clothing",
  },
  shoes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clothing",
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

mongoose.model("Outfit", OutfitSchema);
