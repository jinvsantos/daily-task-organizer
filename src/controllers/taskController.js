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
// Exportamos a função fora da definição
module.exports = { createTask };
