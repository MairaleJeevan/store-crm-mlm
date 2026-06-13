const express = require('express');

const router = express.Router();

const authMiddleware =
    require('../middleware/authMiddleware');

const authorize =
    require('../middleware/authorize');

const {
    getUsers,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');

router.use(authMiddleware);

router.get(
    '/',
    authorize('ADMIN'),
    getUsers
);

router.post(
    '/',
    authorize('ADMIN'),
    createUser
);

router.put(
    '/:id',
    authorize('ADMIN'),
    updateUser
);

router.delete(
    '/:id',
    authorize('ADMIN'),
    deleteUser
);

module.exports = router;