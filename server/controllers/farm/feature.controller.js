const jwt = require("jsonwebtoken");
const featureSchema = require("../../model/featureSchema");
const { sendResponse } = require("../../utils/sendResponse");

exports.addFeature = async (req, res) => {
  try {
    const { featureName, featureIcon } = req.body;

    const newFeature = new featureSchema({
      featureName,
      featureIcon,
    });

    const savedFeature = await newFeature.save();
    console.log("saved", savedFeature);

    sendResponse(res, 200, true, "feature detail added successfully.", {
      data: savedFeature,
    });
  } catch (err) {
    sendResponse(res, 500, true, "Server crashed...", { error: err.message });
  }
};

exports.getAllFeature = async (req, res) => {
  try {
    const allFeatures = await featureSchema.find({});

    sendResponse(res, 200, true, "feature detail added successfully.", {
      data: allFeatures,
    });
  } catch (err) {
    sendResponse(res, 500, true, "Server crashed...", { error: err.message });
  }
};
