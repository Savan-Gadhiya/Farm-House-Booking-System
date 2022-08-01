const mongoose = require("mongoose");

const farmSchema = new mongoose.Schema(
  {
    ownerId: [
      {
        type: String,
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
        type: "Point",
        coordinates: [], //first is longitude and second is latitude
      },
    },
    estimatedCapacity: {
      type: Number,
    },
    price: {
      dateWisePrice: [
        {
          date: Date,
          price: {
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Farm", farmSchema);
