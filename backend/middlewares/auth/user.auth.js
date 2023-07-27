const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Authentication token missing' });
  }

  jwt.verify(token, config.secretKey, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    // Attach the decoded token data to the request
    req.user = decodedToken;
    next();
  });
};

module.exports = authenticateToken;