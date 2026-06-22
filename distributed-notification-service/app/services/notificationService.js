const Notification = require("../models/Notification");

const notificationQueue = require("../config/bullmq");

const createNotification = async (data) => {

  // save in mongo
  const notification = await Notification.create({
    type: data.type,
    to: data.to,
    message: data.message,
  });

  // push to queue
  await notificationQueue.add(
    "send-notification",

    {
      notificationId: notification._id,
    },

    {
      attempts: 3,

      backoff: {
        type: "fixed",
        delay: 3000,
      },
    }
  );

  return notification;
};

module.exports = {
  createNotification,
};