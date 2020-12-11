const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    envPort: process.env.PORT,
    envDatabaseURL: process.env.MONGODB_URL,
    envSessionKey: process.env.SESSION_SECRET,
};