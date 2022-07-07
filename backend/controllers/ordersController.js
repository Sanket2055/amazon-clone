const asyncHandler = require("express-async-handler");
const Order = require("../models/OrderModel");

//POST /api/orders
//Create new orders
//@private
const createOrder = asyncHandler(async (req, res) => {
  const { productId, quantity, name, img, price } = req.body;
  const id = req.user;

  if (!productId || !quantity || !name || !img || !price) {
    res.status(400);
    throw new Error("Enter all fields");
  }
  const order = await Order.create({
    userId: id,
    productId,
    quantity,
    name,
    price,
    img,
  });
  res.status(201).json({ msg: "Order created", order });
});

//GET /api/orders
//Get all orders from a user
//@private
const getOrders = asyncHandler(async (req, res) => {
  const id = req.user;
  res.status(200).json({ orders: await Order.find({ userId: id }) });
});

module.exports = { createOrder, getOrders };
