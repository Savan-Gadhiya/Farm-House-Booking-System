const express = require("express");
const router = express();

const { posts } = require("../controllers/posts");
const checkAuth = require("../utils/checkAuth");

router.get("/posts", checkAuth, posts);

module.exports = router;
