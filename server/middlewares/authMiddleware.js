import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js';

export const protect = async (req, res, next) => {
  let token;

  // Look for the token in cookies
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user object to the request (req.user)
    req.user = await User.findById(decoded.userId).select('-password'); // Ensure user is being correctly assigned
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};
