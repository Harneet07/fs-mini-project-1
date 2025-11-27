const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));

let todos = [{ id: 1, task: "Learn Node", done: false }];

app.get('/todos', (req, res) => res.json(todos));
app.post('/todos', (req, res) => {
  const { task } = req.body;
  const newTodo = { id: todos.length + 1, task, done: false };
  todos.push(newTodo);
  res.json(newTodo);
});
app.patch('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) return res.status(404).json({ message: 'Task not found' });
  todo.done = true;
  res.json({ message: 'Task updated', todo });
});

app.listen(3000, () => console.log('To-Do project running on http://localhost:3000'));
