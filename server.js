const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const { connectDB } = require("./config/db");
const { errorHandler } = require("./middleware/errorHandler");
const path = require("path");
require("dotenv").config();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/products", require("./routes/api/products"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/orders", require("./routes/api/orders"));
app.use("/api/checkout", require("./routes/api/checkout"));

connectDB();

app.use(express.static(path.join(__dirname, "./frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running PORT ${PORT}`));
