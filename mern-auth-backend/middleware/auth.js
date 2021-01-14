const jwt = require("jsonwebtoken");
const jwtToken = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res.status(401).json({ msg: "Token Authorization denied" });
    const verfied = jwt.verify(token, jwtToken);
    if (!verfied)
      return res.status(401).json({ msg: "Verified Authorization denied" });
    
    req.user = verfied.id;
    next();
  } catch (error) {
    res.status(500).json({ error: error.messsage });
  }
};

module.exports = auth;
