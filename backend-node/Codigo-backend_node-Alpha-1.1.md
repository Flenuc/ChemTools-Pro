# backend-node\package.json

{
  "name": "backend-node",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node dist/app.js",
    "build": "tsc",
    "dev": "ts-node --esm --project tsconfig.esm.json src/app.ts"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "backend-node": "file:",
    "bcrypt": "^5.1.1",
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "helmet": "^8.0.0",
    "mongoose": "^8.12.0"
  },
  "devDependencies": {
    "@types/bcrypt": "^5.0.2",
    "@types/cors": "^2.8.17",
    "@types/express": "^5.0.0",
    "@types/node": "^22.13.9",
    "nodemon": "^3.1.9",
    "ts-node": "^10.9.2",
    "typescript": "^5.8.2"
  }
}

# backend-node\tsconfig.json

{
  "compilerOptions": {
    "module": "CommonJS", // Asegúrate de que sea CommonJS
    "target": "ES2020",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}

# backend-node\tsconfig.esm.json

{
    "extends": "./tsconfig.json",
    "compilerOptions": {
      "module": "ESNext", // Usar ES Modules
      "moduleResolution": "NodeNext"
    }
  }

# backend-node\src\app.ts

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

# backend-node\src\routes\userRoutes.ts

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

# backend-node\src\routes\healthRoutes.ts

import express from 'express';

const router = express.Router();

// Ruta de salud
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Node.js API running' });
});

export default router;

# backend-node\src\routes\compoundRoutes.ts

import express from 'express';
import {
  createCompound,
  getCompounds,
  updateCompound,
  deleteCompound,
} from '../controllers/compoundController';

const router = express.Router();

router.post('/', createCompound);
router.get('/', getCompounds);
router.put('/:id', updateCompound);
router.delete('/:id', deleteCompound);

export default router; // Asegúrate de exportar el router

# backend-node\src\routes\chemistryRoutes.ts

import express from 'express';
import axios from 'axios';
const router = express.Router();

router.post('/molar-mass', async (req, res) => {
  try {
    const { formula } = req.body;
    
    // Enviar solicitud al Backend Python
    const pythonResponse = await axios.post(
        'http://backend-python:5000/api/calculate/molar-mass',  // <-- Usar nombre del servicio
        { formula }
      );

    res.status(200).json({ result: pythonResponse.data.result });
  } catch (error) {
    res.status(500).json({ error: 'Error al calcular la masa molar' });
  }
});

export default router;

# backend-node\src\middleware\authMiddleware.ts

import { Request, Response, NextFunction } from 'express';

export const validateToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: 'Acceso no autorizado: Token no proporcionado' });
    return; // No llamar a next() si hay un error
  }

  // Validar token (se implementará en Alpha-3.1)
  if (token === 'token-valido') {
    next(); // Continuar con la siguiente función middleware
  } else {
    res.status(401).json({ message: 'Acceso no autorizado: Token inválido' });
    return; // No llamar a next() si hay un error
  }
};

# backend-node\src\models\User.ts

import mongoose, { Schema, Document } from 'mongoose';
import bcryptjs from 'bcryptjs'; // Cambiado de bcrypt a bcryptjs


export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, ingresa un email válido'],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true } // Agrega automáticamente createdAt y updatedAt
);

// Encriptar la contraseña antes de guardar
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Método para comparar contraseñas
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return await bcryptjs.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);

# backend-node\src\models\Compound.ts

import mongoose, { Schema, Document } from 'mongoose';

// Definir la interfaz para el documento de compuesto
export interface ICompound extends Document {
  name: string;
  formula: string;
  properties?: {
    molarMass?: number;
    density?: number;
    meltingPoint?: number;
    boilingPoint?: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Definir el esquema de MongoDB para los compuestos
const CompoundSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    formula: { type: String, required: true },
    properties: {
      molarMass: { type: Number, required: false },
      density: { type: Number, required: false },
      meltingPoint: { type: Number, required: false },
      boilingPoint: { type: Number, required: false },
    },
  },
  { timestamps: true } // Agrega campos createdAt y updatedAt automáticamente
);

// Exportar el modelo
export default mongoose.model<ICompound>('Compound', CompoundSchema);

# backend-node\src\controllers\userController.ts

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

    res.status(200).json({ success: true, message: 'Autenticación exitosa' });
  } catch (error) {
    console.error("Error general:", error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
};

# backend-node\src\controllers\compoundController.ts

import { Request, Response } from 'express';
import Compound from '../models/Compound';
import axios from 'axios';

// Crear un compuesto
export const createCompound = async (req: Request, res: Response) => {
  const { name, formula } = req.body;

  try {
    // Paso 1: Calcular masa molar con Python
    const molarMassResponse = await axios.post(
      'http://backend-python:5000/api/calculate/molar-mass',
      { formula }
    );
    const molarMass = molarMassResponse.data.result;

    // Paso 2: Guardar compuesto con la masa molar
    const newCompound = new Compound({ 
      name, 
      formula, 
      properties: { molarMass } // <-- Almacenar el resultado
    });
    await newCompound.save();

    res.status(201).json(newCompound);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el compuesto' });
  }
};

// Obtener todos los compuestos
export const getCompounds = async (req: Request, res: Response) => {
  try {
    const compounds = await Compound.find();
    res.status(200).json(compounds);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los compuestos' });
  }
};

// Actualizar un compuesto
export const updateCompound = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, formula } = req.body;

  try {
    const updatedCompound = await Compound.findByIdAndUpdate(
      id,
      { name, formula },
      { new: true, runValidators: true }
    );
    res.status(200).json(updatedCompound);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el compuesto' });
  }
};

// Eliminar un compuesto
export const deleteCompound = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await Compound.findByIdAndDelete(id);
    res.status(200).json({ message: 'Compuesto eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el compuesto' });
  }
};