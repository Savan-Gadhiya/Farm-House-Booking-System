const jwt = require("jsonwebtoken");
const farmSchema = require("../../model/farmSchema");

// @route    POST api/register
// @desc     Login User
// @access   Private
exports.registerFarm = async (req, res) => {
  // Validation of farm data

  const {
    // ownerId,
    farmName,
    description,
    address,
    estimatedCapacity,
    price,
    // featuresId,
    // images,
    // unavailableDates,
  } = req.body;

  console.log(req.body);

  const newFarm = new farmSchema({
    ownerId: req.user._id,
    farmName,
    description,
    address,
    estimatedCapacity,
    price,
  });

  try {
    const savedFarm = await newFarm.save();
    res.status(200).json({
      message: "Farm detail added successfully.",
    });
    // return custom responce
  } catch (err) {
    // send custom responce
    res.status(500).send("Server crashed...", err);
  }

  res.status(200).send({ data: newFarm });
};
