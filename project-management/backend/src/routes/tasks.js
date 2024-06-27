const http = require('http');
const { createTask, getAllTasks, getTaskById, updateTask, deleteTask } = require('../controllers/taskController');

const server = http.createServer((req, res) => {
  if (req.url.startsWith('/api/tasks') && req.method === 'POST') {
    return createTask(req, res);
  } else if (req.url.startsWith('/api/tasks') && req.method === 'GET') {
    const urlParts = req.url.split('/');
    if (urlParts.length === 3) {
      return getAllTasks(req, res);
    } else if (urlParts.length === 4) {
      req.params = { id: urlParts[3] };
      return getTaskById(req, res);
    }
  } else if (req.url.startsWith('/api/tasks') && req.method === 'PUT') {
    const urlParts = req.url.split('/');
    if (urlParts.length === 4) {
      req.params = { id: urlParts[3] };
      return updateTask(req, res);
    }
  } else if (req.url.startsWith('/api/tasks') && req.method === 'DELETE') {
    const urlParts = req.url.split('/');
    if (urlParts.length === 4) {
      req.params = { id: urlParts[3] };
      return deleteTask(req, res);
    }
  }
  res.statusCode = 404;
  res.end('Not Found');
});

server.listen(3001, () => {
  console.log('Task server running on port 3001');
});
