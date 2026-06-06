import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = Number(process.env.PORT) || 8000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    apiPort: port,
    mongoUri,
  });
});

mongoose
  .connect(mongoUri)
  .then(() => {
    app.listen(port, () => {
      console.log(`OctoFit backend running on http://localhost:${port}`);
    });
  })
  .catch((error: unknown) => {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  });
