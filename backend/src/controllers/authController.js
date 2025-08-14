const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');
require('dotenv').config();

exports.signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password, address, role } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.status(400).json({ msg: "Email already registered" });

        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hash, address, role });
        res.status(201).json({ msg: "User registered successfully", user });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.json({ token, role: user.role });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

exports.changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    try {
        const user = await User.findByPk(req.user.id);
        const match = await bcrypt.compare(oldPassword, user.password);
        if (!match) return res.status(400).json({ msg: "Old password incorrect" });

        const hash = await bcrypt.hash(newPassword, 10);
        await user.update({ password: hash });
        res.json({ msg: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
