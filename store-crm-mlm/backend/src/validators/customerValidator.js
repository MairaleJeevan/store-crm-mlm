const { body } = require('express-validator');

const customerValidation = [

    body('customer_name')
        .trim()
        .notEmpty()
        .withMessage('Customer name is required'),

    body('mobile')
        .matches(/^[0-9]{10}$/)
        .withMessage('Mobile must be 10 digits'),

    body('card_type')
        .isIn(['GREEN', 'SILVER', 'GOLD'])
        .withMessage('Invalid card type')

];

module.exports = customerValidation;