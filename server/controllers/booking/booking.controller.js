const bookingSchema = require("../../model/bookingSchema");
const farmSchema = require("../../model/farmSchema");
const { sendResponse } = require("../../utils/sendResponse");
const { getDatesArray } = require("../../utils/getDatesArray");

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
    console.log(req.body);
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
    console.log("in res", result);
    // sending response
    sendResponse(res, 200, true, "Farm booked Successfully", savedbooking);
  } catch (err) {
    console.log("Error while making a booking: ", err);
    sendResponse(res, 500, false, "Server Error", err);
  }
};

// @route    POST /api/booking/
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
    console.log("Error while fetching all booking by userid ", err.message);
    sendResponse(res, 500, false, "Server Error...");
  }
};

// @route    POST /api/getbookingById
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
    console.log("Error while fatching record by booking id: ", err.message);
    sendResponse(res, 500, false, "Server Error...");
  }
};
