const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');

router.get('/list', agentController.getAgents);
router.get('/student-list', agentController.getAgentStudentsList);
router.get('/university-list', agentController.getAgentUniversityList);
router.get('/course-list', agentController.getAgentCourseList); 
router.get('/application-list', agentController.getAgentApplicationList);
router.get('/counsellor-list', agentController.getAgentAllCounsellorList);
// router.post('/create/user', agentController.createUserByAgent);
// router.put('/student/details/:id',agentController.updateAgentStudentDetails);
// router.post('/create/application/:id', agentController.AgentCreateApplication);
// router.put('/student/details/:id',agentController.updateAgentCreateApplication);
module.exports = router;