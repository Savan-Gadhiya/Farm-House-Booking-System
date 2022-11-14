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
      dateWiseRent: [
        {
          date: Date,
          rent: {
            type: Number,
            default: 0,
          },
        },
      ],
      defaultRent: {
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
    farmDocument: {
      docUrl: {
        type: String,
        default: "",
      },
      publicId: {
        type: String,
        default: "",
      },
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
    verificationStatus: {
      type: String,
      enum: ["verified", "pending", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Farm", farmSchema);
