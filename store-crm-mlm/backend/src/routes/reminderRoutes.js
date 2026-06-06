const express =
    require('express');

const router =
    express.Router();

const authMiddleware =
    require('../middleware/authMiddleware');

const {
    createReminder,
    getReminders
} = require(
    '../controllers/reminderController'
);


console.log({
    createReminder,
    getReminders
});

router.use(authMiddleware);

router.post(
    '/',
    createReminder
);

router.get(
    '/',
    getReminders
);

module.exports = router;