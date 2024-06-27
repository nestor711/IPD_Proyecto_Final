const http = require('http');
const { createProject, getAllProjects, getProjectById, updateProject, deleteProject } = require('../controllers/projectController');

const server = http.createServer((req, res) => {
  if (req.url.startsWith('/api/projects') && req.method === 'POST') {
    return createProject(req, res);
  } else if (req.url.startsWith('/api/projects') && req.method === 'GET') {
    const urlParts = req.url.split('/');
    if (urlParts.length === 3) {
      return getAllProjects(req, res);
    } else if (urlParts.length === 4) {
      req.params = { id: urlParts[3] };
      return getProjectById(req, res);
    }
  } else if (req.url.startsWith('/api/projects') && req.method === 'PUT') {
    const urlParts = req.url.split('/');
    if (urlParts.length === 4) {
      req.params = { id: urlParts[3] };
      return updateProject(req, res);
    }
  } else if (req.url.startsWith('/api/projects') && req.method === 'DELETE') {
    const urlParts = req.url.split('/');
    if (urlParts.length === 4) {
      req.params = { id: urlParts[3] };
      return deleteProject(req, res);
    }
  }
  res.statusCode = 404;
  res.end('Not Found');
});

server.listen(3000, () => {
  console.log('Backend server running on port 3000');
});
