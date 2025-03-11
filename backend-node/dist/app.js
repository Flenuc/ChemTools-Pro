"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const healthRoutes_1 = __importDefault(require("./routes/healthRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const compoundRoutes_1 = __importDefault(require("./routes/compoundRoutes"));
const authMiddleware_1 = require("./middleware/authMiddleware");
const chemistryRoutes_1 = __importDefault(require("./routes/chemistryRoutes"));
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/chemicals';
mongoose_1.default.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error('MongoDB connection error:', error));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
// Middleware
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
// Rutas públicas
app.use('/api/health', healthRoutes_1.default);
app.use('/api', healthRoutes_1.default); // Montar healthRoutes en /api
app.use('/api/users', userRoutes_1.default);
app.use('/api/chemistry', chemistryRoutes_1.default); // <-- Montar rutas de química
// Rutas protegidas (requieren autenticación)
app.use('/api/compounds', authMiddleware_1.validateToken, compoundRoutes_1.default);
// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error en el servidor' });
});
app.listen(PORT, () => {
    console.log(`Servidor Node.js corriendo en http://localhost:${PORT}`);
});
exports.default = app;
