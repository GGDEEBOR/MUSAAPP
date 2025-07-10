const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs'); 

// Ruta de REGISTRO
router.post('/register', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Hashea la contraseña
    const user = new User({ email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: 'User created!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Ruta de LOGIN 
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  res.json({
    userId: user._id,
    email: user.email,
    role: user.role
  });
});

module.exports = router;