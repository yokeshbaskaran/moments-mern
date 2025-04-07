const express = require("express");
const router = express.Router();
// const multer = require("multer");
const Image = require("../models/Image");
const Post = require("../models/Post");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authUser = require("../middleware/auth");
const cloudinary = require("cloudinary").v2;

// secret: require('crypto').randomBytes(64).toString('hex')

// //multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads"),
//   filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
// });
// const upload = multer({ storage });

//Routes
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = bcrypt.genSaltSync();
    const hashPwd = bcrypt.hashSync(password, salt);

    const data = { username, email, password: hashPwd };
    // console.log("client data", data);

    const newUser = await User.create(data);
    if (newUser) {
      res.status(201).json({ message: "user created" });
    } else {
      console.log("User not created!");
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
    console.log("Error!" + error.message);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await User.findOne({ email });
    if (!findUser) {
      console.log("Cannot find user details");
      // res.status(404).json({ message: "User not found!!" });
    }

    const dehashed = await bcrypt.compare(password, findUser.password);
    if (!dehashed) {
      console.log("wrong credentials");
    }

    if (findUser && dehashed) {
      const { password: hash, ...userData } = findUser._doc;

      const token = jwt.sign(
        { user: userData },
        process.env.ACCESS_SECRET_TOKEN
      );

      res
        .cookie("access_token", token)
        .json({ user: userData, message: "user logined!!" });
    } else {
      console.log("User not logined!!");
    }
  } catch (error) {
    console.log("Error!" + error.message);
  }
});

router.get("/profile", async (req, res) => {
  const { access_token } = await req.cookies;

  jwt.verify(access_token, process.env.ACCESS_SECRET_TOKEN, {}, (err, info) => {
    if (err) throw err;

    // console.log("info", info.user);
    res.status(200).json(info.user);
  });
});

// router.get("/user", async (req, res) => {
//   try {
//     const allPosts = await Post.find()
//       .populate("image")
//       .sort({ createdAt: -1 });

//     // console.log(allPosts);

//     res.status(200).json(allPosts);
//   } catch (error) {
//     console.log("Error:" + error.message);
//   }
// });

//  upload.single("image"),

router.get("/posts", async (req, res) => {
  try {
    const allPosts = await Post.find()
      .populate(["image", "user"])
      .sort({ createdAt: -1 });

    if (!allPosts) {
      return res.status(404).json({ error: "No posts found" });
    }

    // console.log("allPosts", allPosts);

    res.status(200).json(allPosts);
  } catch (error) {
    console.log("Error:" + error.message);
  }
});

router.post("/posts", authUser, async (req, res) => {
  try {
    let { image } = req.body;
    if (!image) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    // const imageUrl = `http://localhost:${process.env.PORT}/uploads/${req.file.filename}`;
    // const imageUpload = new Image({ imageUrl });
    // await imageUpload.save();

    const imageUrl = await cloudinary.uploader.upload(image);
    image = imageUrl.secure_url;
    // console.log("image", image);

    const { title, description, tags } = req.body;
    const user = await req.user;
    // console.log("req.user", user);

    const dbData = await Post.create({
      title,
      description,
      tags,
      image,
      user: {
        userid: user._id,
        username: user.username,
      },
    });

    // const poppost = await Post.findById(dbData._id).populate("image");

    if (!dbData) {
      return res.status(404).json({ error: "Post not created" });
    }

    res.status(201).json(dbData);
  } catch (error) {
    console.log("Error in createPost:" + error.message);
  }
});

router.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    console.log("Error in deletepost:" + error.message);
  }
});

module.exports = router;
