require('dotenv').config();
const usersRouter = require("./routes/api/users");
const express = require('express');
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");
const Mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  // crednetials allows the cookie to be set when sent
  credentials: true,
  origin: ['http://localhost:3000'],
}));

app.use("/users/api", usersRouter);

// Notify of connection and only then listen on PORT
Mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
      console.log("Auth Server is running on Port: " + PORT);
    })  
  })