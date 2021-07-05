const express = require('express');
const router = express.Router();

/**
 * auth for handle auth
 * @route POST /api/contacts
 * @access PUBLIC
 */

router.post('/', (req, res) => {
  res.send('auth router');
});

/**
 * auth for handle auth
 * @route POST /api/contacts
 * @access PUBLIC
 */

router.get('/', (req, res) => {
  res.send('auth router');
});

router.patch('/', (req, res) => {
  res.send('auth router');
});

router.delete('/', (req, res) => {
  res.send('auth router');
});

module.exports = router;
