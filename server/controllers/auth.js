const {
  registerValidation,
  loginValidation,
} = require("../validators/validation");
const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

// @route    POST api/register
// @desc     Login User
// @access   Private
exports.register = async (req, res) => {
  // Validation of user
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, email, password } = req.body;

  // check is user exist
  const emailExist = await User.findOne({ email: email });
  if (emailExist) return res.status(400).send("Email already exists.");

  // Create a new user
  const user = new User({
    name,
    email,
    password,
  });

  try {
    const savedUser = await user.save();
    // res.send(savedUser);
    return res.status(200).json({ message: "Signup success! Please Login..." });
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
  const user = await User.findOne({ email: email });
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
