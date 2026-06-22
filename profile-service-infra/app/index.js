// app/index.js

const express = require("express");
require("dotenv").config();

const connectDB = require("./config/db");
const { connectRedis } = require("./config/redis");

const profileRoutes = require("./routes/profileRoutes");
const rateLimiter = require("./middleware/rateLimiter");

const app = express();


// Middleware
app.use(express.json());


// Apply Rate Limiter Globally 😈🔥
app.use(rateLimiter);


// Connect Infrastructure
connectDB();
connectRedis();


// Health Check
app.get("/", (req, res) => {
    res.json({
        message: "Profile Service Running 😈🔥",
        hostname: process.env.HOSTNAME,
        pid: process.pid
    });
});


// API Routes
app.use("/api/profile", profileRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(
        `Server running on port ${PORT} | Hostname: ${process.env.HOSTNAME} | PID: ${process.pid}`
    );
});