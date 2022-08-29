const express = require("express");
const router = express();

const { register, login } = require("../controllers/auth");
const {
  addUserDetails,
  getUserController,
} = require("../controllers/user/user.controller");
const checkAuth = require("../utils/checkAuth");

router.post("/register", register);
router.post("/login", login);
router.post("/user", checkAuth, addUserDetails);
router.get("/getuser", getUserController);

module.exports = router;
