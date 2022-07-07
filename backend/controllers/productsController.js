const Product = require("../models/ProductModel");
const asyncHandler = require("express-async-handler");

//GET /api/products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json({ msg: "successfull request", products });
});

//POST /api/products
const postProduct = asyncHandler(async (req, res) => {
  const { name, price, rating, img } = req.body;
  if (!name || !price || !rating || !img) {
    res.status(400);
    throw new Error("Enter all fields");
  }

  const check = await Product.findOne({ name });
  if (check) {
    res.status(400);
    throw new Error("A product with same name already exists");
  }
  const newProduct = await Product.create({ name, price, rating, img });
  res.status(201).json({ msg: "product created", newProduct });
});

//PUT /api/products/:id
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (id == null) {
    console.log(id);
    res.status(400);
    throw new Error("Enter a product id");
  }

  const product = await Product.findById(id);
  if (!product) {
    res.status(400);
    throw new Error("Wrong product id");
  }

  await Product.findByIdAndUpdate(id, req.body);
  const updatedProduct = await Product.findById(id);
  res.status(201).json({ msg: "Product updated", updatedProduct });
});

//DELETE/api/products/:id
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (id == null) {
    console.log(id);
    res.status(400);
    throw new Error("Enter a product id");
  }

  const product = await Product.findById(id);
  if (!product) {
    res.status(400);
    throw new Error("Product does not exist");
  }

  await Product.findByIdAndDelete(id, req.body);
  res.status(201).json({ msg: "Product deleted" });
});

module.exports = { getProducts, postProduct, updateProduct, deleteProduct };
