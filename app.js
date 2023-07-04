const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const port =4000;
const fs = require("fs");
require('dotenv').config({path: __dirname + '/.env'});

app.use(express.static(__dirname + "/public"));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const imgSchema = new mongoose.Schema({
  name: String,
});

const movies = mongoose.model("movies", imgSchema);
const newMovies = mongoose.model("newMovies", imgSchema);
const tredingMovies = mongoose.model("trendingMovies", imgSchema);

const sports = mongoose.model("sports", imgSchema);
const newSports = mongoose.model("newSports", imgSchema);
const tredingSports = mongoose.model("trendingSports", imgSchema);

const concerts = mongoose.model("concerts", imgSchema);
const newConcerts = mongoose.model("newConcerts", imgSchema);
const tredingConcerts = mongoose.model("trendingConcerts", imgSchema);

const specials = mongoose.model("specials", imgSchema);
const newSpecials = mongoose.model("newSpecials", imgSchema);
const tredingSpecials = mongoose.model("trendingSpecials", imgSchema);

const connect = async () => {
  await mongoose
    .connect(
      process.env.MONGODB,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("connected successfully"))
    .catch((err) => console.log("it has an error", err));
};
connect();

app.get("/getnewmoviesdata", async (req, res) => {
  const allData = await newMovies.find();
  console.log(allData)
  res.json(allData);
});

app.get("/gettrendingmoviesdata", async (req, res) => {
  const allData = await tredingMovies.find();
  res.json(allData);
});
app.get("/getnewsportsdata", async (req, res) => {
  const allData = await newSports.find();
  res.json(allData);
});

app.get("/gettrendingsportsdata", async (req, res) => {
  const allData = await tredingSports.find();
  res.json(allData);
});
app.get("/getnewconcertsdata", async (req, res) => {
  const allData = await newConcerts.find();
  res.json(allData);
});

app.get("/gettrendingconcertsdata", async (req, res) => {
  const allData = await tredingConcerts.find();
  res.json(allData);
});
app.get("/getnewspecialsdata", async (req, res) => {
  const allData = await newSpecials.find();
  res.json(allData);
});

app.get("/gettrendingspecialsdata", async (req, res) => {
  const allData = await tredingSpecials.find();
  res.json(allData);
});

app.get("/getimage",(req,res)=>{
  imgname = req.query.name
  console.log("hello")
  console.log(imgname)
  res.download("./uploads/" + imgname);
})

app.listen(port, () => {
  console.log("server running successfully");
});

app.post("/book", (req, res) => {
  console.log(req.body.img);
  res.sendFile(__dirname + "/public/index.html");
});
