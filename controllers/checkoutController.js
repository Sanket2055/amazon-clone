const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const checkout = async (req, res) => {
  const { totalPrice } = req.body;
  try {
    await stripe.paymentIntents.create({
      amount: totalPrice * 100,
      currency: "INR",
      payment_method: "pm_card_amex_threeDSecureNotSupported",
      confirm: true,
      currency: "INR",
    });
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false });
  }
};

module.exports = { checkout };
