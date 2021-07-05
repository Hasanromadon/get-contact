const express = require('express');
const router = express.Router();

/**
 * auth for handle auth
 * @route POST /api/users
 * @access PUBLIC
 */

router.post('/', (req, res) => {
  res.send('auth router');
});

/**
 * auth for handle auth
 * @route GET /api/users
 * @access PUBLIC
 */

router.get('/', (req, res) => {
  res.send('auth router');
});

module.exports = router;
