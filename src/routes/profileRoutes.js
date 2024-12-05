const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/details', profileController.getDetails);
router.put('/update/details',profileController.updateDetails);
module.exports = router;
