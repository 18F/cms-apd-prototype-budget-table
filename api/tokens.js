const jwt = require('jsonwebtoken');

module.exports.getUserFromToken = function getUserFromToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET, { algorithm: process.env.TOKEN_SIGNATURE_ALGORITHM });
};

module.exports.createTokenFromUser = function createTokenFromUser(user) {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRE_TIME, algorithm: process.env.TOKEN_SIGNATURE_ALGORITHM });
};
