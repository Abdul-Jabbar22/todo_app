const moment = require("moment");
const Todo = require("../models/Todo");

const homeController = async (req, res, next) => {
  try {
    const todos = await Todo.find({}).sort({ createdAt: -1 });
    res.locals.moment = moment;
    res.render("index", { title: "List todo", todos });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addTodoFormController = (req, res, next) => {
  try {
    res.render("newTodo", { title: "New todo" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTodoFormController = async (req, res, next) => {
  try {
    const { id } = req.query; // Ensure 'id' is passed as a query parameter
    const todo = await Todo.findById(id);
    res.render("updateTodo", { title: "Update todo", todo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTodoPageController = (req, res, next) => {
  try {
    const { id } = req.query;
    res.render("deleteTodo", { title: "Delete todo", id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addTodoController = async (req, res, next) => {
  try {
    const { title, desc } = req.body;
    const newTodo = new Todo({
      title: title,
      desc: desc,
    });
    await newTodo.save();
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTodoController = async (req, res, next) => {
  try {
    const { id, title, desc } = req.body;
    await Todo.findByIdAndUpdate(id, { title, desc });
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteTodoController = async (req, res, next) => {
  try {
    const { id, confirm } = req.query;
    if (confirm === "yes") {
      // 'yes' should be a string
      await Todo.findByIdAndDelete(id);
    }
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  homeController,
  addTodoFormController,
  updateTodoFormController,
  deleteTodoPageController,
  addTodoController,
  updateTodoController,
  deleteTodoController,
};
