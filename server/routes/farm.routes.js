const express = require("express");
const router = express();

const { registerFarm } = require("../controllers/farm/farm.controller");
// const checkAuth = require("../utils/checkAuth");

router.post("/registerFarm", registerFarm);

module.exports = router;
