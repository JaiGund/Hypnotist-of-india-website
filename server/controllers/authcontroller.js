// controllers/authController.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js';

const signUp = async (req, res) => {
  try {
    const { firstName, middleName, lastName, contactNumber, email, password, city, state } = req.body;

    // Input validation (basic validation)
    if (!firstName || !lastName || !contactNumber || !email || !password) {
      return res.status(400).json({ msg: 'Please fill in all required fields' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User with this email already exists' });
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
      state
    });

    // Save the user to the database
    await newUser.save();

    // Create JWT token (optional)
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the response with the token
    res.status(201).json({
      msg: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Use ES6 export for this function
export { signUp };
