const {
  registerValidation,
  loginValidation,
} = require("../validators/validation");
const jwt = require("jsonwebtoken");

const userSchema = require("../model/userSchema");
const authSchema = require("../model/authSchema");
const { sendResponse } = require("../utils/sendResponse");

// @route    POST api/register
// @desc     Login User
// @access   Private
exports.register = async (req, res) => {
  // Validation of user
  const { error } = registerValidation(req.body);
  if (error)
    return sendResponse(res, 400, false, "Email enter valid email.", {
      error: error.details[0].message,
    });

  const { email, password } = req.body;

  // check is user exist
  const emailExist = await authSchema.findOne({ email: email });
  if (emailExist) return sendResponse(res, 400, false, "Email already exists.");

  // Create a new user
  const auth = new authSchema({
    email,
    password,
  });

  try {
    const savedUser = await auth.save();
    // save used details into user profile table
    const user = new userSchema({
      authId: savedUser._id,
    });
    await user.save();
    // const savedUserProfile = await

    return sendResponse(res, 200, true, "Signup success! Please Login...", {
      savedUser,
    });
  } catch (err) {
    return sendResponse(res, 400, false, "Something went wrong.", {
      error: err,
    });
  }
};

// @route    POST api/login
// @desc     Login User
// @access   Private
exports.login = async (req, res) => {
  // Login Validation
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;

  // check is user exist
  const user = await authSchema.findOne({ email: email });
  if (!user)
    return sendResponse(res, 400, false, "Email or Password is wrong!");

  // if user is found make sure the email and password matches
  // create authenticate method in model and use here.
  if (!user.authenticate(password)) {
    return sendResponse(res, 400, false, "Email and password do not match!");
  }

  // Create and assign token
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  return sendResponse(res, 200, true, "Login Successfull", {
    token: token,
    user: { _id: user._id, email: user.email },
  });
};

// @route    POST api/logout
// @desc     User Logout
// @access   Private
exports.logout = async (req, res) => {
  try {
    const userData = await userSchema.findOne(
      { authId: req.user._id },
      { profileImage: 1 }
    );
    sendResponse(res, 200, true, "You are already loggedIn.", userData);
  } catch (err) {
    return sendResponse(res, 400, false, "Something went wrong.", {
      error: err,
    });
  }
};

// @route    POST api/getuser
// @desc     get auth detail
// @access   Private
exports.getAuth = async (req, res) => {
  try {
    console.log("in........");
    const userData = await userSchema.findOne({ authId: req.user._id });
    sendResponse(res, 200, true, "user detail found", userData);
  } catch (err) {
    return sendResponse(res, 400, false, "Something went wrong.", {
      error: err,
    });
  }
};
