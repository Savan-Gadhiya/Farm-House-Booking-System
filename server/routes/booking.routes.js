const express = require("express");
const router = express();
const {
  bookFarm,
  getAllBookingByUserId,
  getBookingById,
} = require("../controllers/booking/booking.controller");
const checkAuth = require("../utils/checkAuth");

// adding paths
router.get("/getAllBookingByUserId", checkAuth, getAllBookingByUserId);
router.post("/bookFarm", checkAuth, bookFarm);
router.post("/getBookingById", checkAuth, getBookingById);

module.exports = router;
