const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');


router.get('/all',projectController.getAllProjects);
router.get('/public', projectController.getPublicProjects);
router.get('/:id',projectController.getProjectById);
router.post('/add', projectController.addProject);
router.put('/update/:id', projectController.updateProject);
router.delete("/remove/:id",projectController.removeProject);
router.delete("/remove-many",projectController.removeProjects);
module.exports = router;

