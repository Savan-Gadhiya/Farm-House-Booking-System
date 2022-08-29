const express = require("express");
const router = express.Router();
const bookingRoute = require("./booking.routes");
const farmRoute = require("./farm.routes");
const authRoute = require("./auth.routes");
const reviewRoute = require("./reviews.routes");

router.get("/", (req, res) => {
  res.status(200).json({ message: "Api is working..." });
});
// All routes
router.use("/farm", farmRoute);
router.use("/auth", authRoute);
router.use("/booking", bookingRoute);
router.use("/review", reviewRoute);

module.exports = router;
