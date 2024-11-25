const express = require('express');
const router = express.Router();
const crmTokenController = require('../controllers/crmTokenController');

router.post('/get', crmTokenController.verifyToken);


module.exports = router;