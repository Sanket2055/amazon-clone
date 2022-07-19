const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const { connectDB } = require("./config/db");
const { errorHandler } = require("./middleware/errorHandler");
const path = require("path");
require("dotenv").config();
const { v4 } = require("uuid");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/products", require("./routes/api/products"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/orders", require("./routes/api/orders.js"));
app.post("/api/checkout", async (req, res) => {
  const { cartItems, token, totalPrice } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount: totalPrice * 100,
      currency: "INR",
      payment_method: "pm_card_amex_threeDSecureNotSupported",
      confirm: true,
      currency: "INR",
    });
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false });
  }
});
connectDB();

app.use(express.static(path.join(__dirname, "./frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running PORT ${PORT}`));
