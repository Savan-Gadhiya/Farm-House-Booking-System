const mongoose = require("mongoose");
const crypto = require("crypto");
const { boolean } = require("joi");

const authSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    hasedPassword: {
      type: String,
      required: true,
    },
    isAdded: {
      type: String,
      default: "false",
    },
    salt: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

authSchema
  .virtual("password")
  .set(function (password) {
    //create a temporarity variable called password
    this._password = password;
    //gererate salt
    this.salt = this.makeSalt();
    //encryptPassword
    this.hasedPassword = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

authSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hasedPassword;
  },

  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },

  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

module.exports = mongoose.model("Auth", authSchema);
