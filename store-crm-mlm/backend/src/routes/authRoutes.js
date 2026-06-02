const express = require('express');

const router = express.Router();

const {
    login,
    register
} = require('../controllers/authController');

const authMiddleware = require('../middleware/authMiddleware');

const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/login', login);

router.post(
    '/register',
    authMiddleware,
    roleMiddleware('ADMIN'),
    register
);

module.exports = router;