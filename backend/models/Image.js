const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  uploadAt: {
    type: Date,
    default: Date.now,
  },
});

const Image = mongoose.model("image", imageSchema);
module.exports = Image;
