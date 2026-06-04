const express = require('express');

const router = express.Router();

const authMiddleware =
    require('../middleware/authMiddleware');

const {
    getMyCommissions
} = require('../controllers/commissionController');

router.use(authMiddleware);

router.get(
    '/:userId',
    getMyCommissions
);

module.exports = router;