const User = require('../models/User');
const Store = require('../models/Store');
const Rating = require('../models/Rating');

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


