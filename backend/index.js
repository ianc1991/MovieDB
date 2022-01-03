const express = require("express");
const connectDB = require("./config/db")
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const moviesRouter = require("./routes/api/movies")

const app = express();
const PORT = process.env.PORT || 4000;

connectDB();

app.use("/movies", moviesRouter);
app.use(cors());
app.use(logger('dev'));
// TODO - uninstall body parser maybe
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.listen(PORT, () => {
  console.log("Server is running on Port: " + PORT);
});

module.exports = app;