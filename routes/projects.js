const express = require('express');
const router = express.Router();

const { getProjectsAll, getProjectById, getProjectByMonth, updateProject, newProject, deleteProject } = require('../data/controller');

router.get('/', getProjectsAll);
// router.get('/:id', getProjectById);
// router.get('/:monthName', getProjectByMonth);
router.put('/update', updateProject);
router.post('/create', newProject);
router.delete('/delete/:id', deleteProject);

module.exports = router;
