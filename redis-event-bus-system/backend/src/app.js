import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import orderroutes from './routes/order.routes.js';
import paymentroutes from './routes/payment.routes.js';
import notificationRoutes from "./routes/notification.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/orders', orderroutes);
app.use('/api/payments', paymentroutes);
app.use("/api/notifications", notificationRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

export default app;
