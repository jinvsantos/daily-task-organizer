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

module.exports = {
  create,
  getAll
};