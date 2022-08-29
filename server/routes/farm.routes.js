const express = require("express");
const router = express();

const {
  registerFarm,
  getAllFarms,
  getFarmById,
  updateFarmById,
} = require("../controllers/farm/farm.controller");
const checkAuth = require("../utils/checkAuth");
// const checkAuth = require("../utils/checkAuth");

router.post("/registerFarm", checkAuth, registerFarm);
router.get("/getAllFarms", getAllFarms);
router.get("/getFarmById/:farmId", getFarmById);
router.put("/updateFarmById/:farmId", updateFarmById);

module.exports = router;
