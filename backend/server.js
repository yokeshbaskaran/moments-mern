require("dotenv").config();

const express = require("express");
const app = express();
const PORT = 3005 || process.env.PORT;

const fs = require("fs");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const routes = require("./router/routes");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://moments-of-photos.onrender.com"],
    credentials: true,
  })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const uploadDirs = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDirs)) {
  fs.mkdirSync(uploadDirs);
}

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => console.log("MongoDB connected!"))
  .catch((er) => {
    console.log("DB Failed", er.message);
  });

app.use("/api", routes);

// --------------------Deployment---------------

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
});

//--------------------Deployment---------------

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
