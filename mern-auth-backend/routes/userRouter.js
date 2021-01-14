const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs")

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

    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)
    const newUser = new User ({
      email,
      password: passwordHash,
      displayName

    })
    const savedUser = await newUser.save()
    res.json(savedUser)
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

module.exports = router;
