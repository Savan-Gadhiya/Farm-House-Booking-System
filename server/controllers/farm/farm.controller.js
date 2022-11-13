const jwt = require("jsonwebtoken");
const farmSchema = require("../../model/farmSchema");
const { sendResponse } = require("../../utils/sendResponse");

// @route    POST api/farm/registerFarm
// @desc     Register Farm
// @access   Private
exports.registerFarm = async (req, res) => {
  // Validation of farm data

  const {
    // ownerId,
    farmName,
    description,
    address,
    estimatedCapacity,
    price,
    coordinates,
    // featuresId,
    defaultRent,
    images,
    farmDocument,
  } = req.body;

  const newFarm = new farmSchema({
    ownerId: req.user._id,
    farmName,
    description,
    address,
    address: {
      location: {
        coordinates,
      },
    },
    estimatedCapacity,
    rents: { defaultRent },
    images,
    farmDocument,
  });

  try {
    const savedFarm = await newFarm.save();

    sendResponse(res, 200, false, "Farm detail added successfully.", {
      data: savedFarm,
    });
  } catch (err) {
    sendResponse(res, 500, true, "Server crashed...", { error: err.message });
  }
};

// @route    GET api/farm/getAllFarms
// @desc     Get All Farms
// @access   Public
exports.getAllFarms = async (req, res) => {
  try {
    const farms = await farmSchema.find({});

    sendResponse(res, 200, true, "All Farms Fetched", { farms: farms });
  } catch (err) {
    sendResponse(res, 400, false, "Some error occured", { error: err.message });
  }
};

// @route    GET api/farm/getFarmById/farmId
// @desc     Get Farm by Id
// @access   Public
exports.getFarmById = async (req, res) => {
  const farmId = req.params.farmId;
  try {
    const farms = await farmSchema.findById({ _id: farmId });

    sendResponse(res, 200, false, "All Farms Fetched", farms);
  } catch (err) {
    sendResponse(res, 400, true, "Some error occured", { error: err.message });
  }
};

// @route    PUT api/farm/updateFarmById
// @desc     Update Farm By Id
// @access   Private
exports.updateFarmById = async (req, res) => {
  const farmId = req.params.farmId;

  try {
    const farms = await farmSchema.findByIdAndUpdate(
      { _id: farmId },
      req.body,
      {
        new: true,
      }
    );

    sendResponse(res, 200, false, "All Farms Fetched", { farms: farms });
  } catch (err) {
    sendResponse(res, 400, true, "Some error occured", { error: err.message });
  }
};
