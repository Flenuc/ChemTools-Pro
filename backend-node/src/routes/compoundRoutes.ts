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