const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    medicineId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    batch: {
      type: String,
      required: true,
      trim: true
    },

    expiry: {
      type: Date,
      required: true
    },

    dosage: {
      type: String,
      required: true
    },

    sideEffects: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Medicine", medicineSchema);