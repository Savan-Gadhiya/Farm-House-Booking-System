const mongoose = require("mongoose");

const featureSchema = new mongoose.Schema(
	{
		featureName: {
			type: String,
		},
		featureIcon: {
			ImageUrl: {
				type: String,
			},
			publicId: {
				type: String,
			},
		},
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
		},
	},
	{ timestamps: true }
);

module.exports = new mongoose.model("Feature", featureSchema);
