require("dotenv").config();

const express = require("express");
const app = express();
const PORT = 3005 || process.env.PORT;

const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;

const routes = require("./router/routes");

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://moments-of-photos.onrender.com"],
    credentials: true,
  })
);

// cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_SECRET_APIKEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => console.log("MongoDB connected!"))
  .catch((er) => {
    console.log("DB Failed", er.message);
  });

app.use("/api", routes);

// --------------------Deployment---------------

const path = require("path");

app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
});

//--------------------Deployment---------------

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
