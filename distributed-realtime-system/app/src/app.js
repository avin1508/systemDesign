import express from "express";
import cors from "cors";

import orderRoutes from "./routes/order.routes.js";

const app = express();

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    })
);

app.use(express.json());

app.use("/api/orders", orderRoutes);

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        server: process.env.SERVER_NAME,
        message: "Application is running",
    });
});

export default app;