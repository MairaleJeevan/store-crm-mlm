// backend/src/config/appConfig.js

module.exports = {
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET
};