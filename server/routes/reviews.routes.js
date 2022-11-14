const express = require("express");
const router = express.Router();
const {
  addReview,
  updateReview,
  getReviewByFarmId,
  getReviewByBookingId,
} = require("../controllers/farm/review.controller");

const checkAuth = require("../middleware/checkAuth");

router.post("/addreview", checkAuth, addReview);
router.put("/updatereview", checkAuth, updateReview);
router.get("/getreview/:farmId", getReviewByFarmId);
router.post("/getReviewByBookingId", checkAuth, getReviewByBookingId);

module.exports = router;
