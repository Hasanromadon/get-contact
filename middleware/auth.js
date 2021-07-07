const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  //GET TOKEN from Header
  const token = req.header('x-auth-token');

  // check if not token

  if (!token) {
    return res.status(401).json({
      msg: 'No token, authorization denied',
    });
  }

  try {
    const decoded = jwt.verify(token, config.get('JWTsecret'));

    //set req in middle ware with decoded
    req.user = decoded.user;

    next();
  } catch (err) {
    res.status(401).json({
      msg: 'token is not valid',
    });
  }
};
