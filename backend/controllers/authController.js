require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const signToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw createError("JWT_SECRET is not configured", 500);
  }

  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

const userResponse = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  age: user.age,
  createdAt: user.createdAt,
});

const register = async (req, res, next) => {
  try {
    const { name, email, password, age } = req.body;

    if (!name || !email || !password) {
      return next(createError("Name, email, and password are required", 400));
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return next(
        createError("An account with this email already exists", 409),
      );
    }

    const user = await User.create({
      name,
      email: normalizedEmail,
      password,
      age,
    });
    const token = signToken(user._id.toString());

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      user: userResponse(user),
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(createError("Email and password are required", 400));
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    }).select("+password");
    if (!user || !(await user.matchPassword(password))) {
      return next(createError("Invalid email or password", 401));
    }

    const token = signToken(user._id.toString());
    res.json({
      success: true,
      message: "Logged in successfully",
      token,
      user: userResponse(user),
    });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res) => {
  res.json({ success: true, user: userResponse(req.user) });
};

module.exports = { register, login, getMe };
