const express = require('express');

const router = express.Router();

const authMiddleware =
    require('../middleware/authMiddleware');

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

router.get('/dashboard',getDashboardSummary);

router.get('/customers', getCustomerReport);

router.get('/sales', getSalesReport);

router.get('/commissions', getCommissionReport);

router.get('/low-stock', getLowStockReport);

router.get('/business', getBusinessReport);

router.get(
    '/charts',
    authMiddleware,
    getDashboardCharts
);

module.exports = router;