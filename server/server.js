const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const invoiceRoutes = require("./routes/invoiceRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 DEBUG: show all requests
app.use((req, res, next) => {
  console.log("➡️", req.method, req.url);
  next();
});

// ROUTES
app.use("/api/invoices", invoiceRoutes);

// DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error:", err));

// TEST
app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});