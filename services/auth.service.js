const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const generateRefreshToken = async (userId) => {
  const refreshToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "180d",
  });
  try {
    const user = await User.findById(userId);
    user.refreshToken = refreshToken;
    await user.save();
  } catch (error) {
    throw new Error(error);
  }
  return refreshToken;
};
const registerUserService = async (userData) => {
  try {
    const { name, email, password, address, bio, profilePicture } = userData;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }
    const user = await User.create({
      name,
      email,
      password,
      address,
      bio,
      profilePicture,
    });
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

const loginUserService = async (userData) => {
  try {
    const { email, password } = userData;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    return user;
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = {
  generateToken,
  generateRefreshToken,
  registerUserService,
  loginUserService,
};
