const express = require('express');
const router = express.Router();
const forgotPasswordController = require('../controllers/forgotPasswordController');
router.post('/password', forgotPasswordController.forgotPassword);
router.post('/confirm/password',forgotPasswordController.confirmForgotPassword);
module.exports = router;