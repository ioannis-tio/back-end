const express = require("express");
const PORT = process.env.PORT || 3001;
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");

const app = express();
// get data from front end
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

let TODOS = [
  {
    id: "96584d74-9a60-492a-8276-ef463057e706",
    text: "Buy milk",
    isCompleted: false,
  },
  {
    id: "a20bbb21-6c69-47ab-b6a7-b16bb27e176e",
    text: "Lets go to cinema",
    isCompleted: false,
  },
  {
    id: "f9f463a3-870f-49d6-a846-37210d8e398c",
    text: "Walk the dog",
    isCompleted: false,
  },
  {
    id: "0143e90a-1263-4801-9ca8-3f0b09f12efc",
    text: "Go to the supermarket",
    isCompleted: false,
  },
];

/*Get all todos */
app.get("/todo-items", (req, res) => {
  res.status(200).json(TODOS);
});

// Get Todo by id
app.get("/todo-items/:todoid", (req, res) => {
  const { todoid } = req.params;
  let todo = TODOS.filter((item) => item.id === todoid);
  if (!todoid) {
    return res.status(404).json({ error: "ID doesnt exist " });
  }
  res.status(200).json(todo);
});

const createToDoSchema = Joi.object({
  text: Joi.string().required().min(5).lowercase(),
});

// create todo
app.post("/todo-items", (req, res) => {
  const { value, error } = createToDoSchema.validate(req.body);
  if (error) {
    res.status(400).json(error);
    return;
  }

  const new_todo = { id: uuidv4(), text: value.text, isCompleted: false };
  TODOS.push(new_todo);
  res.status(201).json({ new_todo });
});

// update todo by id
app.patch("/todo-items/:todoid", (req, res) => {
  const { todoid } = req.params;
  const { text, isCompleted } = req.body;
  const findTodo = TODOS.find((c) => c.id === todoid);
  findTodo.text = text;
  findTodo.isCompleted = isCompleted;
  res.status(200).json({ message: "updated" });
});

// delete todo
app.delete("/todo-items/:todoid", (req, res) => {
  const { todoid } = req.params;
  if (todoid === -1) return res.status(404).json({ message: "error" });
  const deleteTodo = TODOS.findIndex((todo) => todo.id === todoid);
  TODOS.splice(deleteTodo, 1);
  res.status(200).json({ message: "deleted" });
});

app.get("*", (res, req) => {
  res.status(200).redirect("/todo-items");
});

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
