let tasks =[];
let nextId = 1;

function create(data){
    const task = {
        id: nextId++,
        title: data.title,
        description: data.description || '',
        createdAt: new Date(),
        dueDate: null,
        completed: false,
    };

     tasks.push(task);
     return task;
}

function getAll() {
  return tasks;
}

function getById(id) {
  return tasks.find((t) => t.id === id) || null;
}

function update(id, data) {
  const index = tasks.findIndex(t => Number(t.id) === Number(id));
  if (index === -1) return null;

  if (data.title !== undefined)       tasks[index].title = data.title;
  if (data.description !== undefined) tasks[index].description = data.description;
  if (data.dueDate !== undefined)     tasks[index].dueDate = data.dueDate;
  if (data.completed !== undefined)   tasks[index].completed = data.completed;

  return tasks[index];
}

function remove(id){
  const index = tasks.findIndex(t => Number(t.id) === Number(id));
  if(index === -1) return false;
  tasks.splice(index, 1);
  return true

}

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove
};