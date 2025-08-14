const express = require('express');
const { getDashboardStats, addUser, addStore, getStores, getUsers } = require('../controllers/adminController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

const router = express.Router();

router.get('/dashboard', auth, role(['admin']), getDashboardStats);
router.post('/users', auth, role(['admin']), addUser);
router.post('/stores', auth, role(['admin']), addStore);
router.get('/stores', auth, role(['admin']), getStores);
router.get('/users', auth, role(['admin']), getUsers);

module.exports = router;
