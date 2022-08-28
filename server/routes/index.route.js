const express = require("express");
const router = express();
const orderRoute = require("./order.route");

router.get("/", (req, res) => {
  res.status(200).json({message: "Api is working..."});
})
router.use("/order", orderRoute);

module.exports = router;