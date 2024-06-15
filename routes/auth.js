const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const verifyToken = require('../middleware/auth');

router.post('/register', async (req, res) => {
  const { nombre, apellido, usuario, contresena, correo } = req.body;
  try {
    const newUser = new User({  nombre, apellido, usuario, contresena, correo  });
    await newUser.save();
    res.status(201).send('Usuario registrado');
  } catch (error) {
    res.status(400).send('Error registrando usuario');
  }
});

router.put('/restablecer', async (req, res) => {
  const { correo, contresena } = req.body;
  console.log(req.body)
  try {
    const user = await User.findOne({correo})
    console.log(user)
    if(!user){
      return res.status(401).send('Usuario no existe');
    }
    user.contresena = contresena || user.contresena
    user.save()
    res.status(201).send('cambio exisitoso');
  } catch (error) {
    res.status(400).send('error en cambiar');
  }
});

router.post('/login', async (req, res) => {
  console.log(req.body)
  const { usuario, contresena } = req.body;
  try {
    const user = await User.findOne({ usuario, contresena });
    if (!user) {
      return res.status(401).send('Credenciales inválidas');
    }
    const token = jwt.sign({ id: user._id, username: user.usuario }, process.env.SECRET_KEY, { expiresIn: '7m' });
     res.json({ token });
  } catch (error) {
    res.status(500).send('Error en el servidor');
  }
});

router.get('/protected', verifyToken, (req, res) => {
  res.send(`Hola ${req.user.username}, esta es una ruta protegida.`);
});

module.exports = router;
