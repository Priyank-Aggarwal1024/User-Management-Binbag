const User = require("../models/User");

const getUserProfileService = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) {
    throw new Error("User not found");
  }

  const userProfile = {
    id: user._id,
    name: user.name,
    email: user.email,
    address: user.address,
    bio: user.bio,
    profilePicture: user.profilePicture,
  };

  return userProfile;
};

const updateUserProfileService = async (userId, updateData) => {
  const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
  return user;
};

module.exports = { getUserProfileService, updateUserProfileService };
