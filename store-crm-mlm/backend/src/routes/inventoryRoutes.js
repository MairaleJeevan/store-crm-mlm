const express = require('express');

const router = express.Router();

const authMiddleware =
    require('../middleware/authMiddleware');

const {
    stockIn,
    stockOut,
    getInventoryLedger
} = require('../controllers/inventoryController');

router.use(authMiddleware);

router.post('/stock-in', stockIn);

router.post('/stock-out', stockOut);

router.get('/ledger', getInventoryLedger);

module.exports = router;