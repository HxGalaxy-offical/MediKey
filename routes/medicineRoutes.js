const express = require("express");
const Medicine = require("../models/Medicine");

const router = express.Router();

// Get all medicines
router.get("/", async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch medicines",
      error: error.message
    });
  }
});

// Get medicine by ID
router.get("/:medicineId", async (req, res) => {
  try {
    const medicine = await Medicine.findOne({
      medicineId: req.params.medicineId
    });

    if (!medicine) {
      return res.status(404).json({
        message: "Medicine not found"
      });
    }

    res.json(medicine);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch medicine",
      error: error.message
    });
  }
});

// Add medicine
router.post("/", async (req, res) => {
  try {
    const medicine = new Medicine(req.body);
    const savedMedicine = await medicine.save();

    res.status(201).json(savedMedicine);
  } catch (error) {
    res.status(400).json({
      message: "Failed to add medicine",
      error: error.message
    });
  }
});

// Update medicine
router.put("/:medicineId", async (req, res) => {
  try {
    const medicine = await Medicine.findOneAndUpdate(
      { medicineId: req.params.medicineId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!medicine) {
      return res.status(404).json({
        message: "Medicine not found"
      });
    }

    res.json(medicine);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update medicine",
      error: error.message
    });
  }
});
// Delete medicine
router.delete("/:medicineId", async (req, res) => {
  try {
    const medicine = await Medicine.findOneAndDelete({
      medicineId: req.params.medicineId
    });

    if (!medicine) {
      return res.status(404).json({
        message: "Medicine not found"
      });
    }

    res.json({
      message: "Medicine deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete medicine",
      error: error.message
    });
  }
});
module.exports = router;