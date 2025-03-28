const {
  generateToken,
  registerUserService,
  loginUserService,
  generateRefreshToken,
} = require("../services/auth.service");
const registerUser = async (req, res) => {
  try {
    const user = await registerUserService(req.body);
    const token = generateToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 180 * 24 * 60 * 60 * 1000,
    });
    res.setHeader("Authorization", "Bearer " + token);
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        bio: user.bio,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Server error", error: error });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await loginUserService(req.body);
    const token = generateToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 180 * 24 * 60 * 60 * 1000,
    });
    res.setHeader("Authorization", "Bearer " + token);
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        bio: user.bio,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Server error", error: error });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
