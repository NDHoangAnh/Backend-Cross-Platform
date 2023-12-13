const jwt = require("jsonwebtoken");
const config = require("../configs/index");
function authenToken(req, res, next) {
  const authorizationClient = req.headers["authorization"];
  const token = authorizationClient && authorizationClient.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Missing token" });
  try {
    jwt.verify(token, config.ACCESS_TOKEN_SECRET);
    next();
  } catch (e) {
    console.log(e);
    return res.status(403).json({ message: "Something went wrongs" });
  }
}

function authenAdmin(req, res, next) {
  const authorizationClient = req.headers["authorization"];
  const token = authorizationClient && authorizationClient.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Missing token" });

  try {
    jwt.verify(token, config.ACCESS_TOKEN_SECRET);
    const encodedPayload = token.split(".")[1];
    const data = JSON.parse(atob(encodedPayload));
    if (data.role === "Admin") {
      next();
    } else {
      return res.status(403).json({ message: "Only admin can use this API" });
    }
  } catch (e) {
    return res.status(403).json({ message: "Something went wrongs" });
  }
}

module.exports = {
  authenToken,
  authenAdmin,
};
