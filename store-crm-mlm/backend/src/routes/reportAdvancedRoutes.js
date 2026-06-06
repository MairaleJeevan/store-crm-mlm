const express = require('express');

const router = express.Router();

const authMiddleware =
    require('../middleware/authMiddleware');

const {
    getCustomerReport,
    getSalesReport,
    getInventoryReport
} = require(
    '../controllers/reportAdvancedController'
);

router.use(authMiddleware);

router.get(
    '/customers',
    getCustomerReport
);

router.get(
    '/sales',
    getSalesReport
);

router.get(
    '/inventory',
    getInventoryReport
);

module.exports = router;