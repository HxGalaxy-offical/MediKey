const express = require("express");
const Stock = require("../models/Stock");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get all stock
router.get("/", authMiddleware, async (req, res) => {
  try {
    const stocks = await Stock.find().sort({ createdAt: -1 });

    res.json(stocks);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch stock",
      error: error.message
    });
  }
});

// Add stock
router.post("/", authMiddleware, async (req, res) => {
  try {
    let status = "Available";

    const today = new Date();
    const expiryDate = new Date(req.body.expiry);

    if (expiryDate < today) {
      status = "Expired";
    } else if (req.body.quantity === 0) {
      status = "Out of Stock";
    } else if (req.body.quantity <= 10) {
      status = "Low Stock";
    }

    const stock = new Stock({
      ...req.body,
      status
    });

    const savedStock = await stock.save();

    res.status(201).json(savedStock);
  } catch (error) {
    res.status(400).json({
      message: "Failed to add stock",
      error: error.message
    });
  }
});

// Update stock
router.put("/:medicineId", authMiddleware, async (req, res) => {
  try {
    let status = "Available";

    const today = new Date();
    const expiryDate = new Date(req.body.expiry);

    if (expiryDate < today) {
      status = "Expired";
    } else if (req.body.quantity === 0) {
      status = "Out of Stock";
    } else if (req.body.quantity <= 10) {
      status = "Low Stock";
    }

    const stock = await Stock.findOneAndUpdate(
      { medicineId: req.params.medicineId },
      {
        ...req.body,
        status
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!stock) {
      return res.status(404).json({
        message: "Stock not found"
      });
    }

    res.json(stock);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update stock",
      error: error.message
    });
  }
});

// Delete stock
router.delete("/:medicineId", authMiddleware, async (req, res) => {
  try {
    const stock = await Stock.findOneAndDelete({
      medicineId: req.params.medicineId
    });

    if (!stock) {
      return res.status(404).json({
        message: "Stock not found"
      });
    }

    res.json({
      message: "Stock deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete stock",
      error: error.message
    });
  }
});

module.exports = router;