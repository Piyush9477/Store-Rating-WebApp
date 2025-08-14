const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./src/config/db');

const User = require('./src/models/User');
const Store = require('./src/models/Store');
const Rating = require('./src/models/Rating');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./src/routes/authRoutes'));

sequelize.sync({ alter: true }).then(() => {
    console.log("Database synced");
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
});
