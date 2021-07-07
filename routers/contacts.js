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

router.post(
  '/',
  auth,
  [
    check('name', 'name is required'),
    check('email', 'email is required'),
    check('type', 'type is required'),
    check('phone', 'phone is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({
        errors: errors.array(),
      });

    const { name, email, phone, type } = req.body;

    try {
      const contact = new Contacts({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const newContact = await contact.save();

      res.json(newContact);
    } catch (err) {
      console.error(err);
    }
  }
);

router.patch('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  const contactFields = {};

  if (name) contactFields.email = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    //check contact if exist
    let contact = await Contacts.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: 'contact not found' });

    //check own contact

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    //update contact and create new if not exist
    contact = await Contacts.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    //check contact if exist
    let contact = await Contacts.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: 'contact not found' });

    //check own contact

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    //update contact and create new if not exist
    contact = await Contacts.findByIdAndRemove(req.params.id);

    res.json({ msg: 'contact has been removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
