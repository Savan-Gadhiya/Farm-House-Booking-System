const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  authId: {
    
  }
})

module.exports = mongoose.model("User", userSchema)