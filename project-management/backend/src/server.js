const http = require('http');
const { createProject, getAllProjects, getProjectById, updateProject, deleteProject } = require('./controllers/projectController');
const { createTask, getAllTasks, getTaskById, updateTask, deleteTask } = require('./controllers/taskController');
const { register, login } = require('./controllers/authController');

const server = http.createServer((req, res) => {
  // Define tus rutas aquí, combinando las funciones de los archivos anteriores
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
