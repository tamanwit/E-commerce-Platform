const userModel = require("../model/userModel");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 2 * 60 * 60 * 1000,
};

const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, phone } = req.body;
    if (!fullName || !email || !password || !phone) {
      return res.status(404).json({
        message: "All fields compulsory",
      });
    }
    const emailExist = await userModel.findOne({ email });
    if (emailExist) {
      return res.status(404).json({
        message: "Email already exists",
      });
    }
    const passwordHash = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 3,
    });
    const user = await userModel.create({
      fullName: fullName,
      email: email,
      password: passwordHash,
      phone: phone,
    });
    const response = {
      fullName: fullName,
      email: email,
      phone: phone,
    };

    return res.status(201).json({
      success: true,
      message: "Customer registed success",
      customer: response,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    const payload = {
      id: user._id,
      email: user.email,
    };
    // token signature
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return res.status(200).cookie("token", token, cookieOptions).json({
      message: "Login successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
      },
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server errror" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }
    res.json({
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to get user",
    });
  }
};

const logOut = async (req, res) => {
  try {
    return res.status(200).clearCookie("token", cookieOptions).json({
      success: true,
      message: "logged out success",
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server errror" });
  }
}

module.exports = {
  registerUser,
  loginUser,
  getUser,
  logOut,
};
