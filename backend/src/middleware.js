// src/middleware.js
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { isTokenInvalid } = require("./controllers/AuthController");

dotenv.config();
const SECRET = process.env.SECRET;

const handleJsonErrors = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error("Bad JSON");
    return res.status(400).send({ status: 400, message: "Bad JSON" });
  }
  next();
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);
  if (isTokenInvalid(token)) return res.sendStatus(403);

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = {
  handleJsonErrors,
  authenticateToken,
};
