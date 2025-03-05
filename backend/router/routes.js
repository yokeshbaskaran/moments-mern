const express = require("express");
const router = express.Router();
const multer = require("multer");
const Image = require("../models/Image");
const Post = require("../models/Post");

//multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

router.post("/login", () => {});

router.post("/posts", upload.single("image"), async (req, res) => {
  try {
    // console.log(req.file);

    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const imageUrl = `http://localhost:${process.env.PORT}/uploads/${req.file.filename}`;
    const imageUpload = new Image({ imageUrl });
    console.log("imageUpload", imageUpload);
    await imageUpload.save();

    const { title, description, tags } = req.body;

    const data = {
      title,
      description,
      tags,
    };
    console.log("client data", tags.split(""));

    const tagsArray = tags.split(" ") || tags.split(",");

    const dbData = Post.create({
      title,
      description,
      tags,
      image: imageUpload._id,
    }).populate("image");

    if (dbData) {
      console.log(dbData);
      res.status(201).json(dbData);
    } else {
      console.log("Post not created");
    }
  } catch (error) {
    console.log("Error!" + error.message);
  }
});

router.get("/posts", async (req, res) => {
  try {
    const allPosts = await Post.find()
      .populate("image")
      .sort({ createdAt: -1 });

    console.log(allPosts);

    res.status(200).json(allPosts);
  } catch (error) {
    console.log("Error:" + error.message);
  }
});

module.exports = router;
