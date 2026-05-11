const express = require('express');
const app = express();

app.use(express.json());

// Datos en memoria
let tasks = [
  { id: 1, title: 'Aprender GitHub Actions', completed: false },
  { id: 2, title: 'Hacer el laboratorio', completed: false }
];

// GET /tasks - Obtener todas las tareas
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// GET /tasks/:id - Obtener una tarea
app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

// POST /tasks - Crear nueva tarea
app.post('/tasks', (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /tasks/:id - Actualizar tarea
app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });
  
  task.title = req.body.title || task.title;
  task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;
  res.json(task);
});

// DELETE /tasks/:id - Eliminar tarea
app.delete('/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Task not found' });
  
  tasks.splice(index, 1);
  res.status(204).send();
});

const variableSinUsar = "esto causara error de linting";

module.exports = app;