const express = require("express");
const connectDB = require("./config/db")
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const moviesRouter = require("./routes/api/movies");
const Mongoose  = require("mongoose");
const moviesCtrl = require("./controllers/moviesController");

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

app.use("/movies", moviesRouter);
app.use(cors());

// Morgan logger
app.use(logger('dev'));

// TODO - uninstall body parser or read
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Notify of connection and only then listen on PORT
Mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(PORT, () => {
    console.log("Server is running on Port: " + PORT);
  })  
})


module.exports = app;