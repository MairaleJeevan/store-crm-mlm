const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const validate =
    require('../middleware/validationMiddleware');

const customerValidation =
    require('../validators/customerValidator');

const {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    searchCustomerByMobile
} = require('../controllers/customerController');

router.use(authMiddleware);

router.post(
    '/',
    authMiddleware,
    customerValidation,
    validate,
    createCustomer
);

router.get('/', getCustomers);

router.get('/search/:mobile', searchCustomerByMobile);

router.get('/:id', getCustomerById);

router.put('/:id', updateCustomer);

router.delete('/:id', deleteCustomer);

module.exports = router;