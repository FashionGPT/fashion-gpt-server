const mongoose = require("mongoose");

let PostSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  outfit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Outfit"
  },
  title: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
}
});

mongoose.model("Post", PostSchema);
