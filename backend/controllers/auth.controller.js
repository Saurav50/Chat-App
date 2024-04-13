import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwtTokenGen from "../middlewares/jwtTokenGen.js";
import { io } from "../socket/socket.js";
export const signup = async (req, res) => {
  // res.send("signup route");

  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      res.status(400).json({
        error: "passowrds's donot match",
      });
    }
    const user = await User.findOne({ username });
    if (user) {
      res.status(400).json({
        error: "Username already exists",
      });
    } else {
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
      const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
      const newUser = new User({
        fullName,
        username,
        password: hashedPassword,
        gender,
        profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
      });
      if (newUser) {
        jwtTokenGen(newUser._id, res);
        await newUser.save();
        // socket io functionality
        // send event to all users that new user joined
        const filteredUser = { ...newUser._doc }; // spread operator to create a copy
        delete filteredUser.password;
        io.emit("NEW_USER_JOINED", filteredUser);

        res.status(200).json({
          _id: newUser._id,
          fullName: newUser.fullName,
          username: newUser.username,
          profilePic: newUser.profilePic,
        });
      } else {
        res.status(401).json({ error: "invalid user data" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPswdCorrect = await bcryptjs.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPswdCorrect) {
      res.status(401).json({
        error: "invalid username or passoword",
      });
    } else {
      jwtTokenGen(user._id, res);
      res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        profilePic: user.profilePic,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({
      message: "Logged out succesfully",
    });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};
