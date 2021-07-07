const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const config = require('config');
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



/**
 * user for handle register
 * @route POST /api/users
 * @access PUBLIC
 */

router.post(
  '/',
  //check before send data
  [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'please include a valid email').isEmail(),
    check(
      'password',
      'please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  //send data if oke
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

      if (user) return res.status(400).json({ msg: 'user is already exists' });
      user = new User({ name, email, password });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

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
    }
  }
);

/**
 * auth for handle auth
 * @route GET /api/users
 * @access PUBLIC
 */

router.get('/', (req, res) => {
  res.send('auth router');
});

module.exports = router;
