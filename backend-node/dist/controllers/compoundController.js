"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCompound = exports.updateCompound = exports.getCompounds = exports.createCompound = void 0;
const Compound_1 = __importDefault(require("../models/Compound"));
const axios_1 = __importDefault(require("axios"));
// Crear un compuesto
const createCompound = async (req, res) => {
    const { name, formula } = req.body;
    try {
        // Paso 1: Calcular masa molar con Python
        const molarMassResponse = await axios_1.default.post('http://backend-python:5000/api/calculate/molar-mass', { formula });
        const molarMass = molarMassResponse.data.result;
        // Paso 2: Guardar compuesto con la masa molar
        const newCompound = new Compound_1.default({
            name,
            formula,
            properties: { molarMass } // <-- Almacenar el resultado
        });
        await newCompound.save();
        res.status(201).json(newCompound);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear el compuesto' });
    }
};
exports.createCompound = createCompound;
// Obtener todos los compuestos
const getCompounds = async (req, res) => {
    try {
        const compounds = await Compound_1.default.find();
        res.status(200).json(compounds);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener los compuestos' });
    }
};
exports.getCompounds = getCompounds;
// Actualizar un compuesto
const updateCompound = async (req, res) => {
    const { id } = req.params;
    const { name, formula } = req.body;
    try {
        const updatedCompound = await Compound_1.default.findByIdAndUpdate(id, { name, formula }, { new: true, runValidators: true });
        res.status(200).json(updatedCompound);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar el compuesto' });
    }
};
exports.updateCompound = updateCompound;
// Eliminar un compuesto
const deleteCompound = async (req, res) => {
    const { id } = req.params;
    try {
        await Compound_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: 'Compuesto eliminado' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar el compuesto' });
    }
};
exports.deleteCompound = deleteCompound;
