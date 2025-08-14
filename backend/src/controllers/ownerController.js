const Store = require('../models/Store');
const Rating = require('../models/Rating');
const User = require('../models/User');

exports.getStoreRatings = async (req, res) => {
    try {
        const stores = await Store.findAll({
            where: { owner_id: req.user.id },
            include: [{ model: Rating, include: [User] }]
        });

        if (!stores.length) return res.status(404).json({ msg: "No stores found" });

        const result = stores.map(store => {
            const ratings = store.Ratings.map(r => ({
                userName: r.User.name,
                rating: r.rating
            }));

            const avgRating = ratings.length
                ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(2)
                : null;

            return {
                storeName: store.name,
                averageRating: avgRating,
                ratings
            };
        });

        res.json(result);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

