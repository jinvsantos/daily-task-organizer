const express = require('express');
const router = express.Router();

const { createTask, getAllTasks, getTaskById, updateTask } = require('../controllers/taskController');
router.post('/tasks', createTask);
router.get('/tasks', getAllTasks);
router.get('/tasks/:id', getTaskById);
router.put('/tasks/:id', updateTask);

module.exports = router;