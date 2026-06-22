const { Queue } = require("bullmq");

const redisConnection = require("./redis");

const deadLetterQueue = new Queue(
  "failed-notification-queue",

  {
    connection: redisConnection,
  }
);

module.exports = deadLetterQueue;