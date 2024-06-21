const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const projectsRoutes = require('./routes/projects');
const tasksRoutes = require('./routes/tasks');

app.use(bodyParser.json());
app.use('/api/projects', projectsRoutes);
app.use('/api/tasks', tasksRoutes);

app.listen(3001, () => {
    console.log('Backend running on port 3001');
});
