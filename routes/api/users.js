const express = require("express");
const router = express.Router();
const { createUser, login } = require("../../controllers/usersController.js");

router.route("/").post(createUser);
router.route("/login").post(login);

module.exports = router;
