"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Validar campos
        if (!username || !email || !password) {
            res.status(400).json({ success: false, message: 'Todos los campos son requeridos' });
            return;
        }
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ success: false, message: 'El usuario ya existe' });
            return;
        }
        // Crear usuario sin hashear la contraseña, se hace en el pre-save
        const newUser = new User_1.default({
            username,
            email,
            password, // Enviar password en texto plano
        });
        await newUser.save();
        console.log('Usuario registrado:', { email });
        res.status(201).json({ success: true, message: 'Usuario registrado' });
    }
    catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User_1.default.findOne({ email });
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
        res.status(200).json({ success: true, message: 'Autenticación exitosa', username: user.username });
    }
    catch (error) {
        console.error("Error general:", error);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
};
exports.loginUser = loginUser;
