const express = require("express");
const router = express();

const { register, login, logout } = require("../controllers/auth.controller");
const checkAuth = require("../utils/checkAuth");

router.post("/register", register);
router.post("/login", login);
router.post("/checkauth", checkAuth, logout);

module.exports = router;
