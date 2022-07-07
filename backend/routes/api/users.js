const express = require("express");
const router = express.Router();
const {
  createUser,
  login,
  sample,
} = require("../../controllers/usersController.js");
const { protect } = require("../../middleware/authMiddleware");

router.route("/").post(createUser);
router.route("/login").post(login);

module.exports = router;
