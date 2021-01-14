const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const { response } = require("express");
const jwtToken = process.env.JWT_SECRET;
// console.log({ jwtToken });

router.post("/register", async (req, res) => {
  try {
    let { email, password, passwordCheck, displayName } = req.body;
    console.log(req.body);

    // validation

    if (!email || !password || !passwordCheck)
      return res
        .status(400)
        .json({ msg: "Required fields have not been entered" });

    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "Password must be at least 5 characters" });

    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Password and Password check must be the same" });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res.status(400).json({
        msg:
          "An account with this email already exists. Please use another email",
      });
    if (!displayName) displayName = email;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password: passwordHash,
      displayName,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password)
      return res
        .status(400)
        .json({ msg: "Required fields have not been entered" });

    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(400).json({ msg: "Email not found. Please register" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        msg: "Invalid credentials, please check your password and email",
      });

    const token = jwt.sign({ id: user._id }, jwtToken);
    console.log("here", { token });
    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/delete", auth, async (req, res) => {
  console.log(req.user);
  try {
    const deletedUser = await User.findByIdAndDelete(req.user)
    res.json(deletedUser)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
