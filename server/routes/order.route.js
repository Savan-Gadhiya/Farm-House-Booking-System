const express = require("express");
const router = express();
const { placeOrder } = require("../controllers/order/order.controller");

router.post("/placeOrder", placeOrder);

module.exports = router;