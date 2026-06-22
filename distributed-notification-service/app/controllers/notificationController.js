const notificationService = require(
  "../services/notificationService"
);

const notify = async (req, res) => {
  try {
    const notification =
      await notificationService.createNotification(
        req.body
      );

    return res.status(201).json({
      success: true,
      data: notification,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  notify,
};