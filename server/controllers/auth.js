const {
  registerValidation,
  loginValidation,
} = require("../validators/validation");
const jwt = require("jsonwebtoken");
<<<<<<< HEAD
const User = require("../model/userSchema");
=======

const userSchema = require("../model/userSchema");
const authSchema = require("../model/authSchema");
>>>>>>> e5461e0220903aa07c58a8c55f142ee4ceb0e307

// @route    POST api/register
// @desc     Login User
// @access   Private
exports.register = async (req, res) => {
  // Validation of user
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;

  // check is user exist
  const emailExist = await authSchema.findOne({ email: email });
  if (emailExist) return res.status(400).send("Email already exists.");

  // Create a new user
  const auth = new authSchema({
    email,
    password,
  });

  try {
    const savedUser = await auth.save();

    // res.send(savedUser);
    return res
      .status(200)
      .json({ message: "Signup success! Please Login...", savedUser });
  } catch (err) {
    res.status(400).send(err);
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
  if (!user) return res.status(400).send("Email or Password is wrong.");

  // if user is found make sure the email and password matches
  // create authenticate method in model and use here.
  if (!user.authenticate(password)) {
    return res.status(403).json({
      error: "Email and password do not match!",
    });
  }

  // Create and assign token
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  // console.log(token);
  res
    .header("auth-token", token)
    .send({ token, user: { _id: user._id, email: user.email } });
};
