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