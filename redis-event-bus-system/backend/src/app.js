import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import orderroutes from './routes/order.routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/orders', orderroutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

export default app;
