"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend-node/src/routes/chemistryRoutes.ts
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const router = express_1.default.Router();
router.post('/molar-mass', async (req, res) => {
    try {
        const { formula } = req.body;
        // Enviar solicitud al Backend Python
        const pythonResponse = await axios_1.default.post('http://backend-python:5000/api/calculate/molar-mass', // <-- Usar nombre del servicio
        { formula });
        res.status(200).json({ result: pythonResponse.data.result });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al calcular la masa molar' });
    }
});
exports.default = router;
