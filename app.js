const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const connectMongodb = require("./init/mongodb"); // Ensure the correct spelling
const todoRoute = require("./routes/todo");
const dotenv = require("dotenv");

//environment variable
dotenv.config();

// console.log(process.env.PORT);

// init app

const app = express();

// mongo db connection
connectMongodb();

// view engine

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", todoRoute);

module.exports = app;
