const express = require('express');

const router = express.Router();

const authMiddleware =
    require('../middleware/authMiddleware');

const {
    exportCustomers,
    exportSales,
    exportCommissions
} = require('../controllers/exportController');

router.use(authMiddleware);

router.get('/customers',exportCustomers);
router.get('/sales', exportSales);
router.get('/commissions', exportCommissions);


module.exports = router;