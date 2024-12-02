// controllers/authController.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

// Validate token
const validateToken = (req, res) => {
  const token = req.cookies.token; // Retrieve token from cookies
  if (!token) {
    return res.status(200).json({ isAuthenticated: false }); // No token, user is not authenticated
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    return res.status(200).json({ isAuthenticated: true }); // Valid token, user is authenticated
  } catch (error) {
    return res.status(200).json({ isAuthenticated: false }); // Invalid token
  }
};

// Logout user
const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Ensure secure cookies in production
    sameSite: 'strict',
  });
  res.status(200).json({ msg: 'Logged out successfully' });
};

export { validateToken, logout };



const signUp = async (req, res) => {
  try {
    const { firstName, middleName, lastName, contactNumber, email, password, city, state } = req.body;

    // Input validation (basic validation)
    if (!firstName || !lastName || !contactNumber || !email || !password) {
      return res.status(400).json({ msg: "Please fill in all required fields" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User with this email already exists" });
    }

    // Hash the password before storing it in the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      firstName,
      middleName,
      lastName,
      contactNumber,
      email,
      password: hashedPassword,
      city,
      state,
    });

    // Save the user to the database
    await newUser.save();

    // Create JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "12h" });

    // Set the token in a cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use HTTPS in production
      sameSite: "strict", // Adjust to "lax" or "none" if needed
      maxAge: 3600000, // 1 hour
    });

    // Send the response with the token
    res.status(201).json({
      msg: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });

    // Set the token in a cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use HTTPS in production
      sameSite: "strict", // Adjust to "lax" or "none" if needed
      maxAge: 3600000, // 1 hour
    });

    // Send the response
    res.status(200).json({
      msg: "Sign-in successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

export { signUp, signIn };
