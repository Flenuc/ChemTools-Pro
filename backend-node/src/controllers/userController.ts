import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  try {
    // Validar campos
    if (!username || !email || !password) {
      res.status(400).json({ success: false, message: 'Todos los campos son requeridos' });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ success: false, message: 'El usuario ya existe' });
      return;
    }

    // Crear usuario sin hashear la contraseña, se hace en el pre-save
    const newUser = new User({
      username,
      email,
      password,  // Enviar password en texto plano
    });

    await newUser.save();
    console.log('Usuario registrado:', { email });

    res.status(201).json({ success: true, message: 'Usuario registrado' });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      console.log("Usuario no encontrado para email:", email);
      res.status(401).json({ success: false, message: 'Credenciales inválidas' });
      return;
    }

    const isMatch = await user.comparePassword(password);
    console.log("Resultado de comparePassword:", isMatch);

    if (!isMatch) {
      console.log("Contraseña no válida");
      res.status(401).json({ success: false, message: 'Credenciales inválidas' });
      return;
    }

    res.status(200).json({ success: true, message: 'Autenticación exitosa', username: user.username});
  } catch (error) {
    console.error("Error general:", error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
};