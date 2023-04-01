const express = require("express");
const PORT = process.env.PORT || 3001;
const cors = require("cors");
const todoRouter = require("../routes/todo")

// const  {verifyUser}  = require("./middlewares")

const mongoose = require("mongoose");



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
  


  app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
  });
}

main();
