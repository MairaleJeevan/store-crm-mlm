const express =
    require('express');

const router =
    express.Router();

const authMiddleware =
    require('../middleware/authMiddleware');

const {
    getCustomerProfile
} = require(
    '../controllers/customerProfileController'
);

router.use(authMiddleware);

router.get(
    '/:id',
    getCustomerProfile
);

module.exports = router;