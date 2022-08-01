const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    authId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    emergencyPhoneNumber: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    dob: {
      type: Date,
    },
    idProof: {
      imageUrl: String,
    },
    profileImage: [
      {
        imageUrl: { type: String },
        publicId: { type: String },
      },
    ],
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
      pincode: {
        type: String,
      },
      state: {
        type: String,
      },
      country: {
        type: String,
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
