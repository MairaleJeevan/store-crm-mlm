const express = require('express');

const router = express.Router();

const authMiddleware =
    require('../middleware/authMiddleware');

const authorize =
    require('../middleware/authorize');

const {
    getDashboardSummary,
    getCustomerReport,
    getSalesReport,
    getCommissionReport,
    getLowStockReport,
    getDashboardCharts,
    getBusinessReport
} = require('../controllers/reportController');

router.use(authMiddleware);

router.get(
    '/dashboard',
    authorize('ADMIN', 'MANAGER'),
    getDashboardSummary
);

router.get(
    '/customers',
    authorize('ADMIN', 'MANAGER'),
    getCustomerReport
);

router.get(
    '/sales',
    authorize('ADMIN', 'MANAGER'),
    getSalesReport
);

router.get(
    '/commissions',
    authorize('ADMIN'),
    getCommissionReport
);

router.get(
    '/low-stock',
    authorize('ADMIN', 'MANAGER'),
    getLowStockReport
);

router.get(
    '/business',
    authorize('ADMIN', 'MANAGER'),
    getBusinessReport
);

router.get(
    '/charts',
    authorize('ADMIN', 'MANAGER'),
    getDashboardCharts
);

module.exports = router;