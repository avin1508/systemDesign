const express = require("express");

const notificationRoutes = require(
  "./routes/notificationRoutes"
);

const app = express();

app.use(express.json());

app.use("/api/v1", notificationRoutes);

app.get("/", (req, res) => {
  res.send("Distributed Notification Service");
});

module.exports = app;