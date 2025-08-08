// 1) importa o express para criar o router
const express = require('express');
const router = express.Router();

// 3) importa só a ação que já existe no controller
const { createTask } = require('../controllers/taskController');
// 4) define a rota POST /tasks apontando para o controller
router.post('/tasks', createTask);
// 5) exporta o router para o server.js conseguir usar
module.exports = router;