const express = require('express');
const { getStoreRatings } = require('../controllers/ownerController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

const router = express.Router();

router.get('/ratings', auth, role(['owner']), getStoreRatings);

module.exports = router;
