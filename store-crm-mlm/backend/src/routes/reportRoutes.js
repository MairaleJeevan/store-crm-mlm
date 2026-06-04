const express = require('express');

const router = express.Router();

const authMiddleware =
    require('../middleware/authMiddleware');

const {
    getDashboardSummary,
    getCustomerReport,
    getSalesReport,
    getCommissionReport,
    getLowStockReport
} = require('../controllers/reportController');

router.use(authMiddleware);

router.get('/dashboard',getDashboardSummary);

router.get('/customers', getCustomerReport);

router.get('/sales', getSalesReport);

router.get('/commissions', getCommissionReport);

router.get('/low-stock', getLowStockReport);

module.exports = router;