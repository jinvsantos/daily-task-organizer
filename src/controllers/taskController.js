const Tasks = require('../models/task');

function createTask(req, res) {
  const { title, description, dueDate } = req.body;
  // Validação: título é obrigatório
  if (!title) {
    return res.status(400).json({ error: 'Título é obrigatório' });
  }
  // Inicializamos a data de entrega como null
  let finalDueDate = null;
  // Se o usuário enviou um dueDate, tentamos converter
  if (dueDate) {
    const parsed = new Date(dueDate);
    // Se for inválido (ex. formato errado), retornamos erro 400
    if (isNaN(parsed.getTime())) {
      return res.status(400).json({
        error: 'dueDate inválido. Use ISO 8601, ex: 2025-08-12T18:00:00'
      });
    }
    finalDueDate = parsed;
  }
  // Criamos a tarefa no model, passando o dueDate final (ou null)
  const task = Tasks.create({
    title,
    description,
    dueDate: finalDueDate
  });
  // Retornamos 201 Created com o objeto da tarefa
  return res.status(201).json(task);
}

function getAllTasks(req, res){
    const tasks = Tasks.getAll();
    return res.json(tasks);

}

function getTaskById(req, res){
    const id = parseInt(req.params.id, 10);

    const task = Tasks.getById(id);

    if(!task){
      return res.status(404).json({error: 'Tarefa não encontrada'})
    }

    return res.json(task);
}

function updateTask(req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  const { title, description, dueDate, completed } = req.body;

  // undefined = não atualizar o campo
  let finalDueDate = undefined;

  if (dueDate !== undefined) {
    if (dueDate === null || dueDate === '') {
      finalDueDate = null; // zera o prazo
    } else {
      const parsed = new Date(dueDate);
      if (isNaN(parsed.getTime())) {
        return res.status(400).json({
          error: 'dueDate inválido. Use ISO 8601, ex: 2025-08-12T18:00:00'
        });
      }
      finalDueDate = parsed;
    }
  }

  const dataToUpdate = {
    ...(title !== undefined && { title }),
    ...(description !== undefined && { description }),
    ...(finalDueDate !== undefined && { dueDate: finalDueDate }),
    ...(completed !== undefined && { completed })
  };

  const updated = Tasks.update(id, dataToUpdate);
  if (!updated) {
    return res.status(404).json({ error: 'Tarefa não encontrada' });
  }
  return res.json(updated);
}

function deleteTask(req, res){
  const id = parseInt(req.params.id, 10);
  if(Number.isNaN(id)) return res.status(400).json({ error: 'Id Invalido'});

  const ok = Tasks.remove(id);
  if(!ok) return res.status(404).json({error: 'Tarefa não encontrada'});

  return res.status(204).send();
  
}

// Exportamos a função fora da definição
module.exports = { createTask, getAllTasks, getTaskById, updateTask, deleteTask };
