<<<<<<< HEAD
const app = require("./app");
const PORT = process.env.PORT || 5000;

// listen server
=======
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const PORT = 5000;
// init app

const app = express();
const connectionUrl = "mongodb://127.0.0.1:27017/todob";

mongoose
  .connect(connectionUrl)
  .then(() => console.log("Database connected successfully"))
  .catch((error) => console.log(error.message));

//view engine

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
  try {
    res.render("index");
  } catch (error) {
    res.status(500).jsonA({ message: error.message });
  }
});

app.get("/add-todo", (req, res, next) => {
  try {
    res.render("newTodo");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//update todo
app.get("/update-todo", (req, res, next) => {
  try {
    res.render("updateTodo");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//delete todo
app.get("/delete-todo", (req, res, next) => {
  try {
    res.render("deleteTodo"); // Render the delete-todo.ejs template
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// listen sever
>>>>>>> 793aa87c17fb94ae9e30bccff183e2044c46859a

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
