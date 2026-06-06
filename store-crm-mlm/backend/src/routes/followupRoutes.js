const express = require('express');

const router = express.Router();

const {
    createFollowup,
    getFollowups,
    getTodayFollowups,
    completeFollowup
} = require('../controllers/followupController');

router.post(
    '/',
    createFollowup
);

router.get(
    '/',
    getFollowups
);

router.get(
    '/today',
    getTodayFollowups
);

router.put(
    '/:id/complete',
    completeFollowup
);

module.exports = router;