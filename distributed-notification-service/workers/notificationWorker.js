require("dotenv").config();
const { Worker } = require("bullmq");
const redisConnection = require("../app/config/redis");
const Notification = require("../app/models/Notification");
const connectDB = require("../app/config/db");
const deadLetterQueue = require("../app/config/dlq");

const startWorker = async () => {

  console.log("WORKER FILE STARTED");

  // wait for MongoDB connection
  await connectDB();

  console.log("Worker DB Connected");

  const worker = new Worker(
    "notification-queue",

    async (job) => {

      console.log(`Processing Job ${job.id}`);

      console.log("Job Data:", job.data);

      const { notificationId } = job.data;

      // fetch notification
      const notification =
        await Notification.findById(notificationId);

      if (!notification) {
        throw new Error("Notification not found");
      }

      // processing
      notification.status = "processing";

      await notification.save();

      console.log(
        `Notification ${notification._id} processing`
      );

      // simulate heavy work
      await new Promise((resolve) =>
        setTimeout(resolve, 3000)
      );

      const randomFailure = Math.random() < 0.5;

      if (randomFailure) {

        throw new Error("SMTP Provider Failed");
      }

      // completed
      notification.status = "completed";

      await notification.save();

      console.log(
        `Notification ${notification._id} completed`
      );
    },

    {
      connection: redisConnection,
    }
  );

  worker.on("completed", (job) => {

    console.log(`Job ${job.id} completed`);
  });

  worker.on("failed", async (job, err) => {

    console.log(`Job failed: ${err.message}`);

    if (!job) return;

    const { notificationId } = job.data;

    await Notification.findByIdAndUpdate(notificationId, { status: "failed", });

if (job.attemptsMade >= job.opts.attempts) {

  console.log(
    `Job ${job.id} moved to DLQ 😈🔥`
  );

  await deadLetterQueue.add(

    "failed-notification",

    {
      notificationId,
      error: err.message,
      failedAt: new Date(),
    }
  );
}

  });
};

startWorker();