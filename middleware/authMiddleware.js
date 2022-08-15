const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const protect = asyncHandler(async (req, res, next) => {
  if (!req.headers.authorization) {
    throw new Error("No authorization field");
  }

  let token = req.headers.authorization;

  if (!token) {
    throw new Error("No token");
  }

  if (!token.startsWith("Bearer")) {
    throw new Error("Enter a valid token");
  }

  try {
    token = token.split(" ")[1];
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = id;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorised");
  }
});

module.exports = { protect };
