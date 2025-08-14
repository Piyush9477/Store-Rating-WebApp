const Store = require('../models/Store');
const Rating = require('../models/Rating');
const User = require('../models/User');

exports.getStoreRatings = async (req, res) => {
    try {
        const store = await Store.findOne({ where: { owner_id: req.user.id }, include: [{ model: Rating, include: [User] }] });
        if (!store) return res.status(404).json({ msg: "Store not found" });

        const ratings = store.Ratings.map(r => ({
            userName: r.User.name,
            rating: r.rating
        }));

        const avgRating = ratings.length ? (ratings.reduce((a, b) => a + b.rating, 0) / ratings.length).toFixed(2) : null;

        res.json({ storeName: store.name, averageRating: avgRating, ratings });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
