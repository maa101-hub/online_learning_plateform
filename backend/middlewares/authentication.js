const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // Attach user info to the request object
    next(); // Proceed to the route handler
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

module.exports = authenticate;
