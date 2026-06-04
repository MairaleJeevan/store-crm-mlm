const express = require('express');

const router = express.Router();

const authMiddleware =
    require('../middleware/authMiddleware');

const {
    getMyCommissions,
    getAllCommissions
} = require('../controllers/commissionController');

router.use(authMiddleware);

// Admin - All Commissions
router.get(
    '/',
    getAllCommissions
);

router.get(
    '/my',
    getMyCommissions
);

// User - My Commissions
router.get(
    '/:userId',
    getMyCommissions
);



module.exports = router;