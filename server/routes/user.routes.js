const express = require("express");
const router = express();

const {
  updateUserDetails,
  getUserController,
  getUserDetail,
} = require("../controllers/user/user.controller");
const checkAuth = require("../utils/checkAuth");
const checkAuth1 = require("../middleware/checkAuth");

router.post("/update", checkAuth1, updateUserDetails);
router.get("/getuser", getUserController);
router.post("/getuser", checkAuth, getUserDetail);

module.exports = router;
