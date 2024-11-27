const express = require('express');
const router = express.Router();
const universityController = require('../controllers/universityController');

router.get('/', universityController.getUniversities);
router.get('/filter', universityController.getFilteredUniversities);

module.exports = router;