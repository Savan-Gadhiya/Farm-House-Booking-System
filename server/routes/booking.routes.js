const express = require("express");
const router = express();
const { bookFarm } = require("../controllers/booking/booking.controller");

router.post("/bookFarm", bookFarm);

module.exports = router;