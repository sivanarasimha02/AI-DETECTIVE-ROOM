import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 5001;

async function bootstrap() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`[Server] AI Detective Room API running on port ${PORT}`);
    console.log(`[Server] Health check: http://localhost:${PORT}/api/v1/health`);
  });
}

bootstrap();

