const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../model/User');
const auth = require('../middleware/auth');
const Contacts = require('../model/Contant');

/**
 * auth for handle auth
 * @route POST /api/contacts
 * @access PUBLIC
 */

router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contacts.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({
      msg: 'server failed',
    });
  }
});

/**
 * auth for handle auth
 * @route POST /api/contacts
 * @access PUBLIC
 */

router.post('/', (req, res) => {
  res.send('auth router');
});

router.patch('/', (req, res) => {
  res.send('auth router');
});

router.delete('/', (req, res) => {
  res.send('auth router');
});

module.exports = router;
