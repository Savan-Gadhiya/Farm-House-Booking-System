const jwt = require("jsonwebtoken");
const authSchema = require("../model/authSchema");
const { sendResponse } = require("../utils/sendResponse");

const checkAuth = async (req, res, next) => {
  // const token = req.header("auth-token");
  const token = req.body.token;
  if (!token) return sendResponse(res, 401, false, "Access Denied");
  // return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(verified)
    // { _id: '61dc4afe92898efe987e2e53', iat: 1641830535 } => verified will return
    const result = await authSchema.findOne({ _id: verified._id });
    console.log("result ", result);
    if (!result) {
      return sendResponse(
        res,
        400,
        false,
        "You must need to login for access this page"
      );
    }
    req.user = verified;
    next();
  } catch (err) {
    return sendResponse(res, 400, false, "Invalid Token");
  }
};

module.exports = checkAuth;
