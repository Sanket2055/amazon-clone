const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const { connectDB } = require("./config/db");
const { errorHandler } = require("./middleware/errorHandler");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Products done, give all products
app.use("/api/products", require("./routes/api/products"));
//Create new user and login give JSON Web Token
app.use("/api/users", require("./routes/api/users"));

app.use("/api/orders", require("./routes/api/orders.js"));

connectDB();

app.use(express.static(path.join(__dirname, "./frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running PORT ${PORT}`));
