const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    authId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
    },
    firstName: {
      type: String,
      // default: "",
    },
    lastName: {
      type: String,
      // default: "",
    },
    phoneNumber: {
      type: String,
      // default: "",
    },
    // emergencyPhoneNumber: {
    //   type: String,
    //   default: '',
    // },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      default: "Male",
    },
    dob: {
      type: Date,
      // default: "",
    },
    // idProof: {
    //   imageUrl: String,
    //   // default: '',
    // },
    profileImage: {
      // imageUrl: { type: String, default: "" },
      // publicId: { type: String, default: "" },
    },
    address: {
      address: {
        type: String,
        // default: "",
      },
      address2: {
        type: String,
        // default: "",
      },
      city: {
        type: String,
        // default: "",
      },
      pincode: {
        type: String,
        // default: "",
      },
      state: {
        type: String,
        // default: "",
      },
      country: {
        type: String,
        // default: "",
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
