const mongoose = require("mongoose");

const bookingSchema = require("../../model/bookingSchema");
const farmSchema = require("../../model/farmSchema");
const reviewSchema = require("../../model/reviewSchema");
const { sendResponse } = require("../../utils/sendResponse");
const { reviewValidation } = require("../../validators/validation");

// @route    POST api/review/addreview
// @desc     Add farm review
// @access   Private
exports.addReview = async (req, res) => {
  const { farmId, bookingId, rating, review } = req.body;

  const { isError } = reviewValidation({ rating, review });
  if (isError) return sendResponse(res, 400, false, "Validation falied.");

  try {
    const isFarm = await farmSchema.findOne({ _id: farmId });
    if (!isFarm) return sendResponse(res, 400, false, "Farm is not exist.");

    const isBooked = await bookingSchema.findOne({ _id: bookingId });
    if (!isBooked) return sendResponse(res, 400, false, "Farm is not booked.");

    const saveReview = await reviewSchema.updateOne(
      { bookingId: bookingId },
      {
        $set: {
          userId: req.user._id,
          farmId,
          rating,
          review,
        },
      },
      {
        upsert: true,
      }
    );

    // const saveReview = await newReview.save();
    sendResponse(res, 200, true, "Your review saved successfully.", {
      saveReview: saveReview,
    });
  } catch (error) {
    sendResponse(res, 500, false, "server error", { error: error.message });
  }
};

// @route    GET api/review/getreview/:farmId
// @desc     Get Farm Reviews by farmId
// @access   Public
exports.getReviewByFarmId = async (req, res) => {
  const farmId = req.params.farmId;

  try {
    const isFarm = farmSchema.findOne({ _id: farmId });
    if (!isFarm) return sendResponse(res, 400, false, "Farm is not exist.");
    // const allReview = await reviewSchema.find({ farmId });

    const allReview = await reviewSchema.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "authId",
          as: "User",
        },
      },
      {
        $match: { farmId: { $eq: mongoose.Types.ObjectId(farmId) } },
      },
    ]);

    sendResponse(res, 200, true, "All reviews by farmId.", allReview);
  } catch (error) {
    sendResponse(res, 500, false, "server error");
  }
};

exports.updateReview = async (req, res) => {
  const { reviewId } = req.body;

  try {
    const isUpdate = await reviewSchema.findOneAndUpdate(
      { _id: reviewId },
      req.body,
      {
        new: true,
      }
    );
    if (!isUpdate) sendResponse(res, 400, false, "Your review is not updated.");
    sendResponse(res, 200, true, "Your review is updated successfully.");
  } catch (error) {
    sendResponse(res, 500, false, "server error");
  }
};

// @route    GET api/review/getReviewByBookingId/
// @desc     Get Review By Booking Id
// @access   Private
exports.getReviewByBookingId = async (req, res) => {
  const { bookingId } = req.body;
  try {
    const responce = await reviewSchema.findOne({ bookingId: bookingId });

    sendResponse(res, 200, true, "Review fetched successfully.", {
      data: responce,
    });
  } catch (error) {
    sendResponse(res, 500, false, "server error");
  }
};
