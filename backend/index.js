const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const logger = require("morgan");
const moviesRouter = require("./routes/api/movies");
const Mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();


app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000'],
}));

// Morgan logger
app.use(logger('dev'));

app.use(express.json());
app.use(cookieParser());

app.use("/movies", moviesRouter);

// Notify of connection and only then listen on PORT
Mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(PORT, () => {
    console.log("Server is running on Port: " + PORT);
  })  
})

module.exports = app;