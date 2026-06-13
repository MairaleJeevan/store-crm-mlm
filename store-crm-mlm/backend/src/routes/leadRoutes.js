const express =
    require('express');

const router =
    express.Router();

const authMiddleware =
    require('../middleware/authMiddleware');

const {
    createLead,
    getLeads,
    convertLead,
    updateLeadStatus,
    getLeadPipeline,
    
    
} = require(
    '../controllers/leadController'
);

router.use(authMiddleware);

router.post('/',createLead);
router.get('/', getLeads);
router.post('/convert/:id',convertLead);
router.put('/status/:id', updateLeadStatus);
router.get('/pipeline', getLeadPipeline);



module.exports = router;