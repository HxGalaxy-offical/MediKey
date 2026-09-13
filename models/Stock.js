const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    medicineId: {
      type: String,
      required: true
    },

    medicineName: {
      type: String,
      required: true
    },

    batch: {
      type: String,
      required: true
    },

    quantity: {
      type: Number,
      required: true,
      min: 0
    },

    expiry: {
      type: Date,
      required: true
    },

    status: {
      type: String,
      enum: ["Available", "Low Stock", "Out of Stock", "Expired"],
      default: "Available"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Stock", stockSchema);