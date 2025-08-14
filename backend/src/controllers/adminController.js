const { Op } = require('sequelize');
const User = require('../models/User');
const Store = require('../models/Store');
const Rating = require('../models/Rating');

//Dashboard Stats
exports.getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.count();
        const totalStores = await Store.count();
        const totalRatings = await Rating.count();
        res.json({ totalUsers, totalStores, totalRatings });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//Add new user
exports.addUser = async(req, res) => {
    const bcrypt = require('bcryptjs');
    try {
        const { name, email, password, address, role } = req.body;
        const exists = await User.findOne({ where: { email } });
        if(exists) return res.status(400).json({ msg: "Email already exists" });
        const hashed = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashed, address, role });
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

//Add new store
exports.addStore = async (req, res) => {
    try {
        const { owner_id, name, email, address } = req.body;
        const store = await Store.create({ owner_id, name, email, address });
        res.json(store);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

//Get all stores with average rating
exports.getStores = async (req, res) => {
    try {
        const { search } = req.query;
        let where = {};
        if (search) {
        where = {
            [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } },
            { address: { [Op.like]: `%${search}%` } }
            ]
        };
        }
        const stores = await Store.findAll({
        where,
        include: [
            { model: Rating, attributes: ['rating'] },
            { model: User, as: 'owner', attributes: ['name', 'email'] }
        ]
        });

        //calculate average rating
        const result = stores.map(store => {
            const ratings = store.Ratings.map(r => r.rating);
            const avgRating = ratings.length ? (ratings.reduce((a, b) => a + b) / ratings.length).toFixed(2) : null;
            return { ...store.toJSON(), averageRating: avgRating };
        });

        res.json(result);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

//Get users list with filters
exports.getUsers = async (req, res) => {
    try {
        const { search, role } = req.query;
        let where = {};
        if (search) {
            where[Op.or] = [
                { name: { [Op.like]: `%${search}%` } },
                { email: { [Op.like]: `%${search}%` } },
                { address: { [Op.like]: `%${search}%` } }
            ];
        }
        if (role) {
            where.role = role;
        }
        const users = await User.findAll({ where });
        res.json(users);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};