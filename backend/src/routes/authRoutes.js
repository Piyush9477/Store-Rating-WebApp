const express = require('express');
const { body } = require('express-validator');
const { signup, login, changePassword } = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post(
    '/signup',
    [
        body('name').isLength({ min: 20, max: 60 }),
        body('email').isEmail(),
        body('password').isLength({ min: 8, max: 16 }).matches(/(?=.*[A-Z])(?=.*[^A-Za-z0-9])/),
        body('address').isLength({ max: 400 })
    ],
    signup
);

router.post('/login', login);
router.put('/change-password', auth, changePassword);

module.exports = router;
