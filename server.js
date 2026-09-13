
const searchHistoryRoutes = require("./routes/searchHistoryRoutes");
const stockRoutes = require("./routes/stockRoutes");
const testRoutes = require("./routes/testRoutes");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const medicineRoutes = require("./routes/medicineRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/medicine", medicineRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/history", searchHistoryRoutes);
app.use("/api/stock", stockRoutes);
// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/medikey")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

// Routes
app.use("/api/medicine", medicineRoutes);
app.use("/api/auth", authRoutes);

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "MediKey Backend is running successfully!"
  });
});

// Start server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`MediKey Backend running on http://localhost:${PORT}`);
});
