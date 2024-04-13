import User from "../models/user.model.js";

export const getContacts = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const contacts = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: "internal server error contact contoller" });
  }
};
