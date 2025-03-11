"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
// Registro de usuario
router.post('/register', (req, res) => {
    (0, userController_1.registerUser)(req, res).catch((error) => {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    });
});
// Autenticación de usuario
router.post('/login', (req, res) => {
    (0, userController_1.loginUser)(req, res).catch((error) => {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    });
});
exports.default = router;
