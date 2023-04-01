const express = require("express");
const PORT = process.env.PORT || 3001;
const cors = require("cors");
// const Joi = require("joi");
const todoRouter = require("../routes/todo")

// const  {verifyUser}  = require("./middlewares")

const mongoose = require("mongoose");
const TodoModel = require("./TodoSchema");
const req = require("express/lib/request");


// router

async function main() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  // app.use(verifyUser)
  await mongoose
    .connect(
      "mongodb+srv://gianniskon12:KALIspera1821@cluster0.dyil9y9.mongodb.net/?retryWrites=true&w=majority",
      { useNewUrlParser: true }
    )
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

app.use("/todo-items", todoRouter)
  
  // app.get("/todo-items", async (req, res) => {
  //   const TodoCollection = await TodoModel.find();
  //   res.status(200).json(TodoCollection);
  // });

  // // create todo
  // app.post("/todo-items", async (req, res) => {
  //   const { value, error } = createToDoSchema.validate(req.body);
  //   if (error) {
  //     res.status(400).json(error);
  //     return;
  //   }
  //   const new_todo = await TodoModel.create({ text: value.text });
  //   res.status(201).json({ new_todo });
  // });

  // // Joi validation for create schema
  // const createToDoSchema = Joi.object({
  //   text: Joi.string().required().min(5).lowercase(),
  // });

  // // update todo by id
  // app.patch("/todo-items/:todoid", async (req, res) => {
  //   const { todoid } = req.params;
  //   const { text, isCompleted } = req.body;
  //   try {
  //     await TodoModel.findByIdAndUpdate(todoid, {
  //       text: text,
  //       isCompleted: isCompleted,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   res.status(200).json({ message: "updated" });
  // });

  // // delete todo
  // app.delete("/todo-items/:todoid", async (req, res) => {
  //   const { todoid } = req.params;
  //   if (todoid === -1) return res.status(404).json({ message: "error" });
  //   // const deleteTodo = TODOS.findIndex((todo) => todo.id === todoid);
  //   try {
  //     await TodoModel.findByIdAndDelete(todoid);
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   res.status(200).json({ message: "deleted" });
  // });

  app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
  });
}

main();
