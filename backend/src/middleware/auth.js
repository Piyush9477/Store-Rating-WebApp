const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    const token = req.headers['authorization']?.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "Access Denied" });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch {
        res.status(403).json({ msg: "Invalid Token" });
    }
};
