const express = require("express");
const router = express();

const {
  register,
  login,
  logout,
  getAuth,
} = require("../controllers/auth.controller");
const checkAuth = require("../utils/checkAuth");

router.post("/register", register);
router.post("/login", login);
router.post("/checkauth", checkAuth, logout);
router.post("/getuser", checkAuth, getAuth);

module.exports = router;
