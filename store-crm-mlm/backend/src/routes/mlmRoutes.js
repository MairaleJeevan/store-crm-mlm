const express = require('express');

const router = express.Router();

const authMiddleware =
    require('../middleware/authMiddleware');

const {
    registerMLMUser,
    getDownlines,
    getTeamTree,
    getMLMDashboard
} = require('../controllers/mlmController');

console.log({
    registerMLMUser,
    getDownlines,
    getTeamTree,
    getMLMDashboard
});

// Register MLM User
router.post(
    '/register',
    authMiddleware,
    registerMLMUser
);

// Get Downlines
router.get(
    '/downlines/:userId',
    authMiddleware,
    getDownlines
);

// Get Team Tree
router.get(
    '/team/:userId',
    authMiddleware,
    getTeamTree
);
router.get(
    '/dashboard/:userId',
    authMiddleware,
    getMLMDashboard
);

module.exports = router;