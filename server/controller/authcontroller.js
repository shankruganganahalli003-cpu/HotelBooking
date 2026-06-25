const authmodel = require("../models/authmodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// ================= REGISTER =================
module.exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await authmodel.findOne({ email });

    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    const newuser = await authmodel.create({
      name,
      email,
      password: hash,
    });

    return res.status(201).json({
  message: "Registered successfully",
  success: true,
  user: newuser,
});

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};


// ================= LOGIN =================
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await authmodel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const ismatch = await bcrypt.compare(password, user.password);

    if (!ismatch) {
      return res.status(400).json({ message: "Password does not match" });
    }
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    
   res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
});

res.status(200).json({ message:"user logged in",
  success: true,
  token,
  user,
});

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};