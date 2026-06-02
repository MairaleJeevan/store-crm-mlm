const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const {
    createSale,
    getSales,
    getSaleById,
    getTodaySales
} = require('../controllers/saleController');

router.use(authMiddleware);

router.post('/', createSale);

router.get('/', getSales);

router.get('/today', getTodaySales);

router.get('/:id', getSaleById);

module.exports = router;