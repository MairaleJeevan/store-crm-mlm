const express = require('express');
const router = express.Router();

const authMiddleware =
    require('../middleware/authMiddleware');

const {
    createProduct,
    getProducts,
    getLowStockProducts
} = require('../controllers/productController');

router.use(authMiddleware);

router.post('/', createProduct);
router.get('/', getProducts);
router.get('/low-stock', getLowStockProducts);

module.exports = router;