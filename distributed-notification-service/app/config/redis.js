const Redis = require("ioredis");

const redisConnection = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,

  maxRetriesPerRequest: null,
});

redisConnection.on("connect", () => {
  console.log("Redis Connected");
});

redisConnection.on("error", (err) => {
  console.log("Redis Error:", err);
});

module.exports = redisConnection;