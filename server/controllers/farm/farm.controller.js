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
    featuresId,
    defaultRent,
    images,
    farmDocument,
  } = req.body;

  const newFarm = new farmSchema({
    ownerId: req.user._id,
    farmName,
    description,
    address: {
      ...address,
      location: {
        coordinates,
      },
    },
    estimatedCapacity,
    rents: { defaultRent },
    images,
    farmDocument,
    featuresId,
  });

  console.log("feature ids", featuresId);

  try {
    const savedFarm = await newFarm.save();

    sendResponse(res, 200, false, "Farm detail added successfully.", {
      data: savedFarm,
    });
  } catch (err) {
    sendResponse(res, 500, true, "Server crashed...", { error: err.message });
  }
};

exports.updateFarm = async (req, res) => {
  // Validation of farm data

  const {
    farmId,
    farmName,
    description,
    address,
    estimatedCapacity,
    coordinates,
    featuresId,
    defaultRent,
    // images,
  } = req.body;

  const farmupdatedetail = {
    farmName,
    description,
    address: {
      ...address,
      location: {
        type: "Point",
        coordinates,
      },
    },
    estimatedCapacity,
    rents: { defaultRent },
    // images: { ...images },
    featuresId: [...featuresId],
  };

  // console.log("feature ids", farmupdatedetail);
  // console.log("body ", req.body);

  try {
    const find = await farmSchema.findOne({ _id: farmId });
    console.log("find", find);
    const savedFarm = await farmSchema.findByIdAndUpdate(
      { _id: farmId },
      farmupdatedetail,
      { new: true }
    );

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

// @route    GET api/farm/getFarmById/:farmId
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

// @route    GET api/farm/getFarmsByOwnerId/:ownerId
// @desc     Get Farm by owner Id
// @access   Public
exports.getFarmByOwnerId = async (req, res) => {
  // const ownerId = req.params.ownerId;
  const ownerId = req.user._id;
  try {
    const farms = await farmSchema.find({ ownerId });
    console.log("farms ", farms);
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

// @route    PUT api/farm/deleteImage
// @desc     Delete image
// @access   Private
exports.deleteImage = async (req, res) => {
  const farmId = req.body.farmId;
  const publicId = req.body.publicId;
  try {
    const farms = await farmSchema.findByIdAndUpdate(
      { _id: farmId },
      {
        $pull: {
          images: {
            publicId: publicId,
          },
        },
      }
    );
    sendResponse(res, 200, false, "Farm Deleted Successfully", {
      farms: farms,
    });
  } catch (err) {
    sendResponse(res, 400, true, "Some error occured", { error: err.message });
  }
};

// @route    PUT api/farm/deleteImage
// @desc     Delete image
// @access   Private
exports.addImages = async (req, res) => {
  const farmId = req.body.farmId;
  var images = req.body.images;
  console.log("images. .......", req.body);
  try {
    // const arrr = [...images];
    // console.log("arr...", arrr);
    // console.log("images........", ...images);
    const farms = await farmSchema.updateMany(
      { _id: farmId },
      {
        $push: {
          images: images,
        },
      }
    );
    sendResponse(res, 200, false, "Farm image added Successfully", {
      farms: farms,
    });
  } catch (err) {
    sendResponse(res, 400, true, "Some error occured", { error: err.message });
  }
};

// ------------------------ Below APIs is only for admin --------------------------------

// @route    POST api/farm/updateVerificationStatus
// @desc     This will used to change the verification status of farm
// @access   Private (Only admin can do this)
exports.ChangeVerificationStatus = async (req, res) => {
  try {
    const farmId = req.body.farmId;
    const verificationStatus = req.body.verificationStatus;
    // console.log("verification status; ", verificationStatus, " id: ", farmId);

    const result = await farmSchema.findByIdAndUpdate(
      { _id: farmId },
      { $set: { verificationStatus } },
      { new: true }
    );
    console.log("result: ", result);
    if (result) sendResponse(res, 200, false, "Verification status updated");
  } catch (err) {
    console.log("Error while change verification status: ", err);
    sendResponse(res, 400, true, "Some Error occured", { error: err.message });
  }
};

// @route    GET api/farm/getPendingFarms
// @desc     This API will give all farms which verifation status is in pending
// @access   Private (Only admin can do this)
exports.getPendingFarms = async (req, res) => {
  try {
    console.log("request come");
    const result = await farmSchema.find({ verificationStatus: "pending" });
    if (result)
      return sendResponse(
        res,
        200,
        false,
        "All farms with verification status is pending",
        result
      );
    else return sendResponse(res, 200, false, "no data found");
  } catch (err) {
    console.log(
      "Error while feching a farm with verification status pending: ",
      err
    );
    sendResponse(res, 500, true, "server Error");
  }
};

// @route    GET api/farm/nearfarms
// @desc     This API will give near farms which by given location
// @access   Private (Only admin can do this)
exports.getNearLocationFarms = async (req, res) => {
  try {
    console.log("..................");
    const result = await farmSchema.find({
      "address.location": {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [21.092134, 73.19989],
          },
          $maxDistance: 10000, // in meters
          $minDistance: 0,
        },
      },
    });
    console.log("result is .... ", res);
    sendResponse(res, 200, true, "found", result);
  } catch (err) {
    console.log(
      "Error while feching a farm with verification status pending: ",
      err
    );
    sendResponse(res, 500, true, "server Error");
  }
};
