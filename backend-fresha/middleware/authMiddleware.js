// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// dotenv.config();

// const auth = {};

// auth.verifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   console.log("Authorization Header:", authHeader); 

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Access denied. No token provided." });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded Token:", decoded); 
//     req.user = decoded; 
//     console.log("User Data:", req.user); 
//     next();
//   } catch (err) {
//     return res.status(403).json({ message: "Invalid or expired token." });
//   }
// };

// module.exports = auth;


const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const auth = {};

auth.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

module.exports = auth;
