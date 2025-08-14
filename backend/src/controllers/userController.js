const { Op } = require('sequelize');
const Store = require('../models/Store');
const Rating = require('../models/Rating');

//Get all stores with user's rating & overall rating
exports.getStores = async (req, res) => {
    try {
        const { search } = req.query;
        let where = {};
        if (search) {
            where = {
                [Op.or]: [
                    { name: { [Op.like]: `%${search}%` } },
                    { address: { [Op.like]: `%${search}%` } }
                ]
            };
        }
        const stores = await Store.findAll({ where, include: [Rating] });

        const result = stores.map(store => {
            const ratings = store.Ratings.map(r => r.rating);
            const avgRating = ratings.length ? (ratings.reduce((a, b) => a + b) / ratings.length).toFixed(2) : null;
            const myRatingEntry = store.Ratings.find(r => r.user_id === req.user.id);
            return {
                id: store.id,
                name: store.name,
                address: store.address,
                averageRating: avgRating,
                myRating: myRatingEntry ? myRatingEntry.rating : null
            };
        });
        res.json(result);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

//Submit or update a rating
exports.submitRating = async (req, res) => {
    try {
        const { store_id, rating } = req.body;
        let existing = await Rating.findOne({ where: { store_id, user_id: req.user.id } });

        if (existing) {
            existing.rating = rating;
            await existing.save();
            return res.json({ msg: "Rating updated", rating: existing });
        }
        const newRating = await Rating.create({ store_id, user_id: req.user.id, rating });
        res.json({ msg: "Rating submitted", rating: newRating });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
