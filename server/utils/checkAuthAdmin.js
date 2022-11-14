const jwt = require("jsonwebtoken");
const authSchema = require("../model/authSchema");

const checkAuthAdmin = async (req, res, next) => {
  // const token = req.header("auth-token");
  const token = req.body.token;
  // console.log("inside checkAuthAdmin ", req.body);
  // console.log("token: ", token);
  if (!token) return res.status(401).send("Access Denied");
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(verified)
    // { _id: '61dc4afe92898efe987e2e53', iat: 1641830535 } => verified will return
    const result = await authSchema.findOne({ _id: verified._id });
    console.log("result ", verified, result);
    if (!result) {
      return res.status(400).json({
        message: "You must need to login for access this page",
      });
    }
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = checkAuthAdmin;
