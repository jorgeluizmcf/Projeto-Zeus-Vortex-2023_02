// /src/controllers/AuthController.js
const Usuario = require("../models/Usuario");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();
const SECRET = process.env.SECRET;

const invalidTokens = new Set(); // Lista de tokens inválidos

const login = async (req, res) => {
  try {
    console.log("Login request received");
    const { email, senha } = req.body;

    console.log(`Searching for user with email: ${email}`);
    const user = await Usuario.findOne(email);

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User found, checking password");
    const passwordMatch = await bcrypt.compare(senha, user.senha);
    if (!passwordMatch) {
      console.log("Invalid credentials");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("Password valid, generating token");
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
      expiresIn: "1h",
    });

    console.log("Token generated, sending response");
    res.status(200).json({ message: "Authentication successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];
  invalidTokens.add(token);
  res.status(200).json({
    statusCode: 200,
    message: "Logout successful",
  });
  console.log("Logout realizado com sucesso!")
};

const isTokenInvalid = (token) => invalidTokens.has(token);

module.exports = { login, logout, isTokenInvalid };
