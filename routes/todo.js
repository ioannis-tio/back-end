const express = require("express");
const router = express.Router();
const Joi = require("joi");
const TodoModel = require("../models/TodoSchema");

router.get("/", async (req, res) => {
  const TodoCollection = await TodoModel.find();
  res.status(200).json(TodoCollection);
});

// Joi validation for create schema
const createToDoSchema = Joi.object({
  text: Joi.string().required().min(5).lowercase(),
});

// create todo
router.post("/", async (req, res) => {
  const { value, error } = createToDoSchema.validate(req.body);
  if (error) {
    res.status(400).json(error);
    return;
  }
  const new_todo = await TodoModel.create({ text: value.text });
  res.status(201).json({ new_todo });
});

// update todo by id
router.patch("/:todoid", async (req, res) => {
  const { todoid } = req.params;
  const { text, isCompleted } = req.body;
  try {
    await TodoModel.findByIdAndUpdate(todoid, {
      text: text,
      isCompleted: isCompleted,
    });
  } catch (error) {
    console.log(error);
  }
  res.status(200).json({ message: "updated" });
});

// delete todo
router.delete("/:todoid", async (req, res) => {
  const { todoid } = req.params;
  if (todoid === -1) return res.status(404).json({ message: "error" });
  // const deleteTodo = TODOS.findIndex((todo) => todo.id === todoid);
  try {
    await TodoModel.findByIdAndDelete(todoid);
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({ message: "deleted" });
});

module.exports = router;
