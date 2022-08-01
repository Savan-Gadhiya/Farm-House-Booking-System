const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    farmId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farm",
    },
    rating: {
      type: Number,
      default: 0,
    },
    review: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
