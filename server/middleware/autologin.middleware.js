const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization
    if (!token) {
      return res.status(401).json({message: 'Авторизоваться не получилось'});
    }
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({message: 'Авторизоваться не получилось'});
  }
}