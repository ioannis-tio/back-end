const express = require("express");
const router = express.Router();
const TodoModel = require("./TodoSchema");

module.export = router;

// Get Todo by id
// router.get("//:todoid", (req, res) => {
//   const { todoid } = req.params;
//   let todo = TODOS.filter((item) => item.id === todoid);
//   if (!todoid) {
//     return res.status(404).json({ error: "ID doesnt exist " });
//   }
//   res.status(200).json(todo);
// });
