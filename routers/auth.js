const express = require('express');
const router = express.Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

/**
 * auth for handle auth
 * @route POST /api/users
 * @access PUBLIC
 */

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    res.json(user);
  } catch (err) {
    res.status(501).json({
      msg: 'Server error',
    });
  }
});

/**
 * auth for handle auth
 * @route POST /api/users
 * @access PUBLIC
 */

router.post(
  '/',
  //check before send data
  [
    check('email', 'enter a valid email').isEmail(),
    check('password', 'enter the password').exists(),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('JWTsecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.send(token);
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).send('server errror');
    }
  }
);

module.exports = router;
