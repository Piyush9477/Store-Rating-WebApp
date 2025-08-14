const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./src/config/db');

const User = require('./src/models/User');
const Store = require('./src/models/Store');
const Rating = require('./src/models/Rating');

//Setup relationships
Store.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });
User.hasMany(Store, { foreignKey: 'owner_id' });

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/admin', require('./src/routes/adminRoutes'));
app.use('/api/user', require('./src/routes/userRoutes'));
app.use('/api/owner', require('./src/routes/ownerRoutes'));

sequelize.sync({ alter: true }).then(() => {
    console.log("Database synced");
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
});
