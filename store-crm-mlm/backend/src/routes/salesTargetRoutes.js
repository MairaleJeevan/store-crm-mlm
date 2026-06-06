const express =
    require('express');

const router =
    express.Router();

const {
    createTarget,
    getTargets
} = require(
    '../controllers/salesTargetController'
);

router.post(
    '/',
    createTarget
);

router.get(
    '/',
    getTargets
);

module.exports = router;