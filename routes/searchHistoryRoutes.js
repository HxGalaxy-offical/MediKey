const express = require("express");
const SearchHistory = require("../models/SearchHistory");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Add search history
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { medicineId, medicineName } = req.body;

    const history = new SearchHistory({
      userId: req.user.id,
      medicineId,
      medicineName
    });

    const savedHistory = await history.save();

    res.status(201).json(savedHistory);
  } catch (error) {
    res.status(400).json({
      message: "Failed to save search history",
      error: error.message
    });
  }
});

// Get user's search history
router.get("/", authMiddleware, async (req, res) => {
  try {
    const history = await SearchHistory.find({
      userId: req.user.id
    }).sort({ createdAt: -1 });

    res.json(history);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch search history",
      error: error.message
    });
  }
});

module.exports = router;