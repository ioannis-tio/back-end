const express = require("express");
const router = express.Router();
const { schema, userModel } = require("../models/UserSchema");

const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.send(`email:   username:   password: `);
});

router.post("/", async (req, res) => {
  const { value, error } = schema.createUser.validate(req.body);
  if (error) {
    res.status(400).json(error);
    return;
  }

  const existingUser = userModel.user.findOne({ email: value.email });
  if (existingUser) {
    res.status(409).json(error);
    return;
  }
  
  // console.log(existingUser);

  const hassPW = await bcrypt.hash(value.password, 10);

  const new_user = await userModel.user.create({
    username: value.username,
    email: value.email,
    password: hassPW,
  });

  res.status(201).json({ new_user });
});

module.exports = router;
