const express = require("express");
const router = express();
const { placeOrder } = require("../controllers/order/order.controller");
const checkAuth = require("../utils/checkAuth");

router.post("/placeOrder", checkAuth, placeOrder);

module.exports = router;
