const express = require('express');

const router = express.Router();

const authMiddleware =
    require('../middleware/authMiddleware');

const {
    getDashboardSummary
} = require('../controllers/reportController');

router.use(authMiddleware);

router.get(
    '/dashboard',
    getDashboardSummary
);

module.exports = router;