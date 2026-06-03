const express = require('express');

const router = express.Router();

const authMiddleware =
    require('../middleware/authMiddleware');

const {
    registerMLMUser,
    getDownlines
} = require('../controllers/mlmController');

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

module.exports = router;