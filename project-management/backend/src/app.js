const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database'); // Archivo de configuración de Sequelize
const projectRoutes = require('./routes/project');
const taskRoutes = require('./routes/task');
const authRoutes = require('./routes/auth');

const app = express();
app.use(bodyParser.json());

app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => console.log(err));
