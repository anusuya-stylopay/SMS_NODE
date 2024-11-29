const express = require('express');
const router = express.Router();
const otpController = require('../controllers/otpController');

router.post('/', otpController.verifyOTP);
router.post('/resend', otpController.reSendOTP);

module.exports = router;