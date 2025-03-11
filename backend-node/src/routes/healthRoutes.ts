import express from 'express';

const router = express.Router();

// Ruta de salud
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Node.js API running' });
});

export default router;