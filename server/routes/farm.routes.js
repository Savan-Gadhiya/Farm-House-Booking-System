const express = require("express");
const router = express();

const {
  registerFarm,
  getAllFarms,
  getFarmById,
  updateFarmById,
  getPendingFarms,
  ChangeVerificationStatus,
  getNearLocationFarms,
  getFarmByOwnerId,
  deleteImage,
  updateFarm,
  addImages,
  searchFarms,
} = require("../controllers/farm/farm.controller");
const checkAuth = require("../utils/checkAuth");
const checkAdminAuth = require("../utils/checkAuthAdmin");

router.post("/registerFarm", checkAuth, registerFarm);
router.post("/updateFarm", checkAuth, updateFarm);
router.get("/getAllFarms", getAllFarms);
router.get("/getFarmById/:farmId", getFarmById);
router.put("/updateFarmById/:farmId", updateFarmById);
router.post("/getFarmsByOwnerId", checkAuth, getFarmByOwnerId);
router.put("/deleteImage", deleteImage);
router.put("/addimages", addImages);

router.post("/getPendingFarms", checkAdminAuth, getPendingFarms);
router.post(
  "/ChangeVerificationStatus",
  checkAdminAuth,
  ChangeVerificationStatus
);
router.get("/nearfarms/:longitude/:latitude", getNearLocationFarms);
router.post("/searchFarms", searchFarms);

module.exports = router;
