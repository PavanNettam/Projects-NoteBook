const express = require('express');
const {postProject, getProjects, getProject, updateProject, deleteProject} = require('../controllers/projectControllers')

const router = express.Router();

router.get('/',getProjects);

router.get('/:id',getProject);

router.delete('/:id', deleteProject);

router.post('/',postProject);

router.patch('/:id',updateProject);

module.exports = router;