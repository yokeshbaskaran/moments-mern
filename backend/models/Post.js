const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    user: {
      userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      username: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("post", postSchema);
module.exports = Post;
