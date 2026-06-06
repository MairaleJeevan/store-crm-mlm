const express =
    require('express');

const router =
    express.Router();

const authMiddleware =
    require('../middleware/authMiddleware');

const {
    getFollowupDashboard
} = require(
    '../controllers/followupDashboardController'
);

router.use(authMiddleware);

router.get(
    '/',
    getFollowupDashboard
);

module.exports = router;