const http = require('http');
const { register, login } = require('../controllers/authController');

const server = http.createServer((req, res) => {
  if (req.url === '/api/auth/register' && req.method === 'POST') {
    return register(req, res);
  } else if (req.url === '/api/auth/login' && req.method === 'POST') {
    return login(req, res);
  }
  res.statusCode = 404;
  res.end('Not Found');
});

server.listen(3002, () => {
  console.log('Auth server running on port 3002');
});
