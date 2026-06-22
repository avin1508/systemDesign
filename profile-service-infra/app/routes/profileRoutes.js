// app/routes/profileRoutes.js

const express = require("express");
const profileController = require("../controllers/profileController");

const profileRouter = express.Router();

// Create Profile
profileRouter.post("/create", profileController.createProfile);

// Get Profile By ID
profileRouter.get("/:id", profileController.getProfile);

profileRouter.put("/:id", profileController.updateProfile);

// app/routes/profileRoutes.js

profileRouter.delete("/:id", profileController.deleteProfile);

module.exports = profileRouter;