const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const logger = require('../logger');

const JWT_SECRET = process.env.JWT_SECRET;

// Registrar usuario
async function register(req, res) {
  try {
    const { username, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword, name });
    logger.info(`User registered: ${user.id}`);
    res.status(201).json({ message: 'User registered' });
  } catch (error) {
    logger.error('Error registering user', error);
    res.status(500).json({ message: 'Error registering user' });
  }
}

// Iniciar sesión
async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    logger.info(`User logged in: ${user.id}`);
    res.status(200).json({ token });
  } catch (error) {
    logger.error('Error logging in', error);
    res.status(500).json({ message: 'Error logging in' });
  }
}

module.exports = { register, login };
