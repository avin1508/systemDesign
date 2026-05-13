const express = require("express");
const redis = require("redis");

const app = express();

const PORT = 3000;


// Redis client 😈
const client = redis.createClient({
    url: "redis://redis:6379"
});


// Connect Redis 😈
async function connectRedis() {

    await client.connect();

    console.log("Connected to Redis 😈");
}

connectRedis();


// Route 😈
app.get("/", async (req, res) => {

    const ip = req.ip;

    // atomic increment 😈
    const requestCount = await client.incr(ip);

    // first request 😈
    if (requestCount === 1) {
        await client.expire(ip, 60);
    }

    console.log(`IP: ${ip} → Count: ${requestCount}`);

    // limit exceeded 😈
    if (requestCount > 10) {
        return res.status(429).send("Too many requests 😈");
    }

    res.send(`Allowed 😈 Count: ${requestCount}`);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});