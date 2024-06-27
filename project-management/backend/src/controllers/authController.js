const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const logger = require('../logger');

// Registrar un nuevo usuario
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    logger.info(`User registered: ${user.id}`);
    res.status(201).json({ message: 'User registered' });
  } catch (error) {
    logger.error('Error registering user', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

// Iniciar sesión
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    logger.info(`User logged in: ${user.id}`);
    res.status(200).json({ token });
  } catch (error) {
    logger.error('Error logging in', error);
    res.status(500).json({ message: 'Error logging in' });
  }
};
