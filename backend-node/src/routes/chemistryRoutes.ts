// backend-node/src/routes/chemistryRoutes.ts
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