import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();
app.use(
  cors({
    origin: 'https://dall-e-frontend-rho.vercel.app',
  })
);

app.use(express.json({ limit: '50mb' }));

app.use('/post', postRoutes);
app.use('/dalle', dalleRoutes);

app.get('/', async (req, res) => {
  res.send('Hello from DALL.E');
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server has started on ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

export default app;
