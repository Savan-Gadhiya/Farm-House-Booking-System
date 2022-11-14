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
			{$set: { verificationStatus }},
			{new: true}
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
		const result = await farmSchema.find({"verificationStatus": "pending"});
		if(result)
			return sendResponse(res, 200, false, "All farms with verification status is pending", result);
		else 
			return sendResponse(res, 200, false, "no data found");
	} catch (err) {
		console.log("Error while feching a farm with verification status pending: ", err);
		sendResponse(res, 500, true, "server Error");
	}
};
