const express = require("express");
const router = express.Router();
const {
  getProducts,
  postProduct,
  updateProduct,
} = require("../../controllers/productsController");

router.route("/").get(getProducts).post(postProduct);
router.route("/:id").put(updateProduct);

module.exports = router;
