const bookingSchema = require("../../model/bookingSchema");
const farmSchema = require("../../model/farmSchema");
const { sendResponse } = require("../../utils/sendResponse");
const { getDatesArray } = require("../../utils/getDatesArray");
const { mongoose } = require("mongoose");

// @route    POST api/booking/bookFarm
// @desc     Used to book a farm house
// @access   Private
exports.bookFarm = async (req, res) => {
	try {
		// validation of farm data
		// const {error} =

		// take userid from req
		const userId = req.user._id;
		// getting data from request
		const { farmId, checkInDate, checkOutDate, totalPrice, noOfPeople } =
			req.body;
		// adding farm
		const booking = new bookingSchema({
			farmId,
			userId,
			checkInDate,
			checkOutDate,
			totalPrice,
			noOfPeople,
		});
		const savedbooking = await booking.save();

		const dateArray = getDatesArray(
			new Date(checkInDate),
			new Date(checkOutDate)
		);
		// Push date Here to farm collection in unavailable dates
		const result = await farmSchema.updateOne(
			{ _id: farmId },
			{ $push: { unavailableDates: { $each: dateArray } } }
		);
		// sending response
		sendResponse(res, 200, true, "Farm booked Successfully", savedbooking);
	} catch (err) {
		sendResponse(res, 500, false, "Server Error", err);
	}
};

// @route    GET /api/booking/getAllBookingByUserId
// @desc     get all booking of farm Id
// @access   Private
exports.getAllBookingByUserId = async (req, res) => {
	try {
		// geting user id from the req that is stored using checkAuth
		const userId = req.user._id;
		const data = await bookingSchema.find({ userId: userId });
		// send response
		sendResponse(res, 200, true, "Data fetch Successfully", data);
	} catch (err) {
		sendResponse(res, 500, false, "Server Error...");
	}
};

// @route    POST /api/booking/getbookingById
// @desc     get all booking by user Id
// @access   Private
exports.getBookingById = async (req, res) => {
	try {
		const bookingId = req.body.bookingId;
		const userId = req.user._id;
		const data = await bookingSchema.findById({ _id: bookingId });
		// If booking id is right but the that booking ID is not belongs to current user then return
		if (data.userId.toString() !== userId) {
			return sendResponse(res, 400, false, "Invalid Request");
		}
		// Send response
		sendResponse(res, 200, true, "Data fetch Successfully", data);
	} catch (err) {
		sendResponse(res, 500, false, "Server Error...");
	}
};

// @route    GET api/booking/bookingReceived
// @desc     This API will give list of all the orders that owner get in there all farms
// @access   Private
exports.bookingReceived = async (req, res) => {
	const ownerId = req.user._id;
	// const ownerId = "63710ee5edfe30e51cdc8b20";
	try {
		const result = await bookingSchema.aggregate([
			{
				$lookup: {
					// get the all farm details associated with booking
					from: "farms",
					localField: "farmId",
					foreignField: "_id",
					as: "farmDetail",
				},
			},
			{
				$unwind: "$farmDetail", // unwind because make farmDetail as individual object
			},
			{
				$project: {
					ownerId: "$farmDetail.ownerId",
					// farmDetail: 1,
					farmId: 1,
					userId: 1,
					checkInDate: 1,
					checkOutDate: 1,
					totalPrice: 1,
					noOfPeople: 1,
					farmImages: "$farmDetail.images",
					farmName: "$farmDetail.farmName",
				},
			},
			{
				$unwind: "$ownerId",
			},
			{
				$match: {
					$expr: {
						// ownerId: {$toObjectId: ownerId} // NOT Woking...
						$eq: ["$ownerId", { $toObjectId: ownerId }], // Working...
					},
				},
			},
			{
				$lookup: {
					from: "users",
					localField: "userId",
					foreignField: "authId",
					as: "userDetail"
				}
			},
			{
				$unwind: "$userDetail"
			},
			{
				$project: {
					"userDetail._id": 0,
					"userDetail.authId": 0,
					"userDetail.wishList": 0,
					"userDetail.updatedAt": 0,
					"userDetail.createdAt": 0
				}
			}
			

		]);
		sendResponse(res, 200, true, "booking fetched successfully", result);
	} catch (err) {
		console.log("Error while fetching received orders of the: ", err);
		sendResponse(res, 500, true, "Server Error");
	}
};
