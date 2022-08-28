const mongoose = require("mongoose");

// In this file all reference are commented for testing...
const orderSchema = new mongoose.Schema(
	{
		farmId: {
			type: String,
			// type: mongoose.Schema.Types.ObjectId,
			// ref: "Farm",
		},
		userId: {
			type: String,
			// type: mongoose.Schema.Types.ObjectId,
			// ref: "User",
		},
		checkInDate: {
			type: Date,
			// min: Date.now(),
			// max: Date.now() + 31104000000, // 12*30*24*60*60*1000
		},
		checkOutDate: {
			type: Date,
			// min: Date.now(),
			// max: Date.now() + 31104000000, // 12*30*24*60*60*1000
		},
		totalPrice: {
			type: Number,
		},
		payment: {},
		noOfPeople: {
			type: Number,
		},
		orderDate: {
			type: Date,
			default: Date.now
		},
		status: {
			type: String,
			enum: ["Success", "Fail", "Cancel"],
			default: "Success"
		},
		reviewId: {
			type: String
			// type: mongoose.Schema.Types.ObjectId,
			// ref: "Review",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
