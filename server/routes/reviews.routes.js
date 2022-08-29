const express = require("express");
const router = express.Router();
const {
  addReview,
  updateReview,
  getReviewByFarmId,
} = require("../controllers/farm/review.controller");

const checkAuth = require("../utils/checkAuth");
// const checkAuth = require("../utils/checkAuth");

router.post("/addreview", checkAuth, addReview);
router.put("/updatereview", checkAuth, updateReview);
router.get("/getreview/:farmId", getReviewByFarmId);

module.exports = router;
