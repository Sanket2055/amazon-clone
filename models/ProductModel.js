const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: String,
  price: Number,
  rating: Number,
  img: String,
});

module.exports = mongoose.model("Product", ProductSchema);
