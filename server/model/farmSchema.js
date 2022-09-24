const mongoose = require("mongoose");

const farmSchema = new mongoose.Schema(
  {
    ownerId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    farmName: {
      type: String,
    },
    description: {
      type: String,
    },
    address: {
      addressLine1: {
        type: String,
      },
      addressLine2: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      pincode: {
        type: String,
      },
      location: {
        type: {
          type: String,
          default: "Point",
        },
        coordinates: [], //first is longitude and second is latitude
      },
    },
    estimatedCapacity: {
      type: Number,
    },
    rents: {
      dateWisePrice: [
        {
          date: Date,
          rent: {
            type: Number,
            default: 0,
          },
        },
      ],
      defaultPrice: {
        type: Number,
        default: 0,
      },
    },
    featuresId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Feature",
      },
    ],
    images: [
      {
        imageUrl: {
          type: String,
        },
        publicId: {
          type: String,
        },
      },
    ],
    unavailableDates: [
      {
        type: Date,
      },
    ],
    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Farm", farmSchema);
