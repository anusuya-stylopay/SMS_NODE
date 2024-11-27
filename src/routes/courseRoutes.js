const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

router.get('/', courseController.getCourse);
router.get('/filter', courseController.filterCourse);
module.exports = router;