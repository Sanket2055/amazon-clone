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
  let status;
  let error;
  try {
    const { cartItems, token, totalPrice } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const idempotencyKey = v4();
    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: totalPrice * 100,
        currency: "inr",
        customer: customer.id,
        receipt_email: token.email,
        payment_method: "pm_card_visa",
        payment_method_options: {
          card: {
            request_three_d_secure: "any",
          },
        },
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      },
      {
        idempotencyKey,
      }
    );
    console.log(paymentIntent);

    const confirmPaymentIntent = await stripe.paymentIntents.confirm(
      paymentIntent.id,
      { payment_method: paymentIntent.payment_method }
    );
    status = "success";
  } catch (error) {
    console.log(error);
    status = "failure";
  }
  res.json({ error, status });
});
connectDB();

app.use(express.static(path.join(__dirname, "./frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running PORT ${PORT}`));
