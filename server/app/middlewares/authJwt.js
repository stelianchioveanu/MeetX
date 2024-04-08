const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  let token = req.session.tokenMeetX;
  if(!token) {
    res.status(403).send({ message: "No token provided!" });
    return;
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};
