const userSchema = require("../../model/userSchema");
const authSchema = require("../../model/authSchema");
const {
  userValidation,
  addressValidation,
} = require("../../validators/validation");

exports.addUserDetails = async (req, res) => {
  const {
    firstName,
    lastName,
    phoneNumber,
    emergencyPhoneNumber,
    gender,
    dob,
    idProof,
    profileImage,
    address,
  } = req.body;

  // Validation of user
  const { error } = userValidation({
    firstName,
    lastName,
    phoneNumber,
    emergencyPhoneNumber,
    dob,
    idProof,
  });
  if (error) return res.status(400).send(error.details[0].message);

  // const { addressError } = addressValidation(address);
  // console.log("is error ", addressError);
  // if (addressError)
  //   return res.status(400).send(addressError.details[0].message);

  try {
    // check auth id is exist or not
    const isAuth = await authSchema.findOne({ _id: req.user }); // req.id from auth middleware
    if (!isAuth)
      return res.status(400).json({
        message: "User not found",
      });
    // check detail already added or not
    if (isAuth.isAdded == "true") {
      return res.status(400).json({
        message: "User detail already added.",
      });
    }
    // Create User Details
    const user = new userSchema({
      authId: req.user._id,
      firstName,
      lastName,
      phoneNumber,
      emergencyPhoneNumber,
      gender,
      dob,
      idProof,
      profileImage,
      address,
    });
    await user.save();
    isAuth.isAdded = true;
    await isAuth.save();
    // remaining to change...
    return res.status(200).json({
      message: "User Detail Added Successfully.",
      statusCode: 201,
    });
  } catch (err) {
    res.status(500).send("Server crashed...", err);
  }
};

exports.getUserController = async (req, res) => {
  try {
    const user = await userSchema.find().populate("authId");
    res.status(200).send({
      message: "User Detail Found.",
      status: 200,
      userData: user,
    });
  } catch (err) {
    res.status.json({
      message: "server crashed..." + err,
    });
  }
};
