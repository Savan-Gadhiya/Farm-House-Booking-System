const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    authId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
    },
    firstName: {
      type: String,
      default: null,
    },
    lastName: {
      type: String,
      default: null,
    },
    phoneNumber: {
      type: String,
      default: null,
    },
    emergencyPhoneNumber: {
      type: String,
      default: null,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      default: "Male",
    },
    dob: {
      type: Date,
      default: null,
    },
    idProof: {
      imageUrl: String,
      // default: null,
    },
    profileImage: [
      {
        imageUrl: { type: String, default: null },
        publicId: { type: String, default: null },
      },
    ],
    address: {
      addressLine1: {
        type: String,
        default: null,
      },
      addressLine2: {
        type: String,
        default: null,
      },
      city: {
        type: String,
        default: null,
      },
      pincode: {
        type: String,
        default: null,
      },
      state: {
        type: String,
        default: null,
      },
      country: {
        type: String,
        default: null,
      },
    },
    wishList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Farm",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
