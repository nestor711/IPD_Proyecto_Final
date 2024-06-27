require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const projectRoutes = require('./routes/project');
const taskRoutes = require('./routes/task');
const authRoutes = require('./routes/auth');
const initDb = require('./initDb'); // Importar el script de inicialización

const app = express();
app.use(bodyParser.json());

app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

// Ejecutar el script de inicialización antes de arrancar el servidor
sequelize.sync({ force: true }) // Use { force: true } for development to drop tables if they exist
  .then(async () => {
    await initDb();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => console.log(err));
