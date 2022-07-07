const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");
const bcrpyt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//POST /api/users
//Register new users
//@public
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new Error("Enter all fields");
  }

  if (await User.findOne({ email })) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await hashPassword(password);
  const user = await User.create({ name, email, password: hashedPassword });
  res.status(201).json({ msg: "User created", user });
});

//POST /api/users/login
//Login
///@public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Enter all fields");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  if (await bcrpyt.compare(password, user.password)) {
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  res.status(200).json({
    msg: "Successfully logged in",
    id: user._id,
    name: user.name,
    token: await generatejwt(user._id),
  });
});

const hashPassword = async (password) => {
  const salt = await bcrpyt.genSalt(10);
  return await bcrpyt.hash(password, salt);
};

const generatejwt = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

module.exports = { createUser, login };
