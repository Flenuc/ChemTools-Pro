import express from 'express';
import { registerUser, loginUser } from '../controllers/userController';

const router = express.Router();

// Registro de usuario
router.post('/register', (req, res) => {
  registerUser(req, res).catch((error) => {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  });
});

// Autenticación de usuario
router.post('/login', (req, res) => {
  loginUser(req, res).catch((error) => {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  });
});

export default router;