const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    // console.log(verified)
    // { _id: '61dc4afe92898efe987e2e53', iat: 1641830535 } => verified will return
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = checkAuth;
