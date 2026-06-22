const { Queue } = require("bullmq");

const redisConnection = require("./redis");

const notificationQueue = new Queue("notification-queue", {
  connection: redisConnection,
});

module.exports = notificationQueue;