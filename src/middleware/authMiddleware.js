const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
  try {
    // 1. Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.jwt);

    // 3. Attach user to request
    req.user = await User.findById(decoded.id).select('-password'); // exclude password

    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }

    next(); // ✅ move to the next middleware/route
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token', error: error.message });
  }
};

module.exports = authMiddleware;
