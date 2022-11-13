const express = require("express");
const router = express();

const {
  addFeature,
  getAllFeature,
} = require("../controllers/farm/feature.controller");

router.post("/addfeature", addFeature);
router.get("/getallfeatures", getAllFeature);

module.exports = router;
