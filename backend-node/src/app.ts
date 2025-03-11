import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import healthRoutes from './routes/healthRoutes';
import userRoutes from './routes/userRoutes';
import compoundRoutes from './routes/compoundRoutes';
import { validateToken } from './middleware/authMiddleware';
import chemistryRoutes from './routes/chemistryRoutes';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/chemicals';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));




dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Rutas públicas
app.use('/api/health', healthRoutes);
app.use('/api', healthRoutes); // Montar healthRoutes en /api
app.use('/api/users', userRoutes);

app.use('/api/chemistry', chemistryRoutes); // <-- Montar rutas de química

// Rutas protegidas (requieren autenticación)
app.use('/api/compounds', validateToken, compoundRoutes);

// Manejo de errores
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error en el servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor Node.js corriendo en http://localhost:${PORT}`);
});

export default app;