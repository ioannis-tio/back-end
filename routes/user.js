const express = require("express");
const router = express.Router();
const Joi = require("joi");
const UserModal = require("../models/UserSchema");

router.get("/", (req, res) => {
  res.send(`email:   username:   password: `);
});

const createUserSchema = Joi.object({
  username: Joi.string().required().min(5).max(20),
  email: Joi.string().required().email(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .messages({
      "string.pattern.base": `Password should be between 3 to 30 characters and contain letters or numbers only`,
      "string.empty": `Password cannot be empty`,
      "any.required": `Password is required`,
    }),
  confirmPassword: Joi.any().valid(Joi.ref("password")).required(),
});

router.post("/", async (req, res) => {
  const { value, error } = createUserSchema.validate(req.body);
  if (error) {
    res.status(400).json(error);
  }
  const new_user = await UserModal.create({
    username: value.username,
    email: value.username,
    password: value.password,
    confirmPassword: value.password,
  });

  res.status(201).json({ new_user });
});

module.exports = router;
