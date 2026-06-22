const { client } = require("../config/redis");

const WINDOW_SECONDS = 60;
const MAX_REQUESTS = 5;

const rateLimiter = async (req, res, next) => {
    try {
        const ip = req.ip;
        const key = `rate_limit:${ip}`;

        // Atomic increment
        const requestCount = await client.incr(key);

        // First request → set TTL
        if (requestCount === 1) {
            await client.expire(key, WINDOW_SECONDS);
        }

        console.log(`IP: ${ip} | Count: ${requestCount}`);

        // Limit exceeded
        if (requestCount > MAX_REQUESTS) {
            return res.status(429).json({
                success: false,
                message: "Too many requests. Try again later."
            });
        }

        next();
    } catch (error) {
        console.error("Rate limiter error:", error);
        next();
    }
};

module.exports = rateLimiter;