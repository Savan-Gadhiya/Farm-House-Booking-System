const express = require("express");
const router = express();

const {
  updateUserDetails,
  getUserController,
  getUserEmail
} = require("../controllers/user/user.controller");
const checkAuth = require("../middleware/checkAuth");

router.post("/update", checkAuth, updateUserDetails);
router.get("/getuser", getUserController);
router.get("/getEmail", checkAuth, getUserEmail);

module.exports = router;
