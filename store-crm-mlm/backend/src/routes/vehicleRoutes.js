const express = require('express');

const router = express.Router();

const authMiddleware =require('../middleware/authMiddleware');

const {
    createVehicleSale,
    markVehicleOut,
    getVehicles
} = require('../controllers/vehicleController');

router.use(authMiddleware);

router.post( '/', createVehicleSale);

router.put( '/out/:id', markVehicleOut);

router.get( '/', getVehicles);

module.exports = router;