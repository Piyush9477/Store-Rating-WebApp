const express = require('express');
const { getStores, submitRating } = require('../controllers/userController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

const router = express.Router();

router.get('/stores', auth, role(['user']), getStores);
router.post('/ratings', auth, role(['user']), submitRating);

module.exports = router;
