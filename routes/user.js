const express = require("express");
const router = express.Router();
// const Joi = require("joi");
// const UserModal = require("../models/UserSchema");
const { schema, userModel } = require("../models/UserSchema");

const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.send(`email:   username:   password: `);
});

router.post("/", async (req, res) => {
  const { value, error } = schema.createUser.validate(req.body);
  if (error) {
    res.status(400).json(error);
  }

  const hassPW = await bcrypt.hash(value.password, 10);

  const new_user = await userModel.user.create({
    username: value.username,
    email: value.username,
    password: hassPW,
  });

  res.status(201).json({ new_user });
});

module.exports = router;
