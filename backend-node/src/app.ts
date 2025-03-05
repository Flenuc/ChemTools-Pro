import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
// Routes
app.get('/api/health', (req, res) => {
res.status(200).json({ status: 'OK', message: 'Node.js API running' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Server error' });
  });  
    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    });
    export default app;