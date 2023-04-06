const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username cannot be empty"],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
  },
  password: {
    type: String,
    required: [true, "Password cannot be empty"],
  },
});

const User = mongoose.model("User", userSchema);

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

const schema = {
  createUser: createUserSchema,
};

const userModel = {
  user: User,
};

module.exports = { userModel, schema };
