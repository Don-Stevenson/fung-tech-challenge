const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const jwtToken = process.env.JWT_SECRET;


// registering with credential checks
router.post("/register", async (req, res) => {
  try {
    let { email, password, passwordCheck } = req.body;
   
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

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password: passwordHash,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// logging in only with correct credentials
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
      res.json({
      token,
      user: {
        id: user._id
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// deleting a user
router.delete("/delete", auth, async (req, res) => {
  
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//checking if the token is valid
router.post("/tokenIsValid", async (req, res) => {
 
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verfied = jwt.verify(token, jwtToken);
    if (!verfied) return res.json(false);

    const user = await User.findById(verfied.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// getting one user
router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
     id: user._id,
  });
});
module.exports = router;
