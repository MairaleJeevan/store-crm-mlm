const express = require('express');

const router = express.Router();

const authMiddleware =
    require('../middleware/authMiddleware');

const {
    getStockDashboard
} = require('../controllers/stockDashboardController');

router.use(authMiddleware);

router.get(
    '/',
    getStockDashboard
);

module.exports = router;