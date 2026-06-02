const express = require('express');

const router = express.Router();

const {
    testDatabaseConnection
} = require('../controllers/testController');

router.get('/test-db', testDatabaseConnection);

module.exports = router;