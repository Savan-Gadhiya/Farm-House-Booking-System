const express = require("express");
const router = express();
const {
  bookFarm,
  getAllBookingByUserId,
  getBookingById,
  bookingReceived,
} = require("../controllers/booking/booking.controller");
const checkAuth = require("../utils/checkAuth");

// adding paths
router.post("/getAllBookingByUserId", checkAuth, getAllBookingByUserId);
router.post("/bookFarm", checkAuth, bookFarm);
router.post("/getBookingById", checkAuth, getBookingById);
router.post("/bookingReceived", checkAuth, bookingReceived);

module.exports = router;
