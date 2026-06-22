// app/controllers/profileController.js

const userProfile = require("../service/profileService");

const userProfileController = {};

// Create Profile
userProfileController.createProfile = async (req, res) => {
    try {
        const user = await userProfile.createProfile(req.body);

        return res.status(201).json({
            success: true,
            message: "User Profile Created Successfully 😈🔥",
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Profile By ID
userProfileController.getProfile = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await userProfile.getProfileById(id);

        return res.status(200).json({
            success: true,
            source: result.source,
            data: result.data
        });
    } catch (error) {
        if (error.message === "Profile not found") {
            return res.status(404).json({
                success: false,
                message: "Profile not found"
            });
        }

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


userProfileController.updateProfile = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedProfile = await userProfile.updateProfile(
            id,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: "Profile Updated Successfully 😈🔥",
            data: updatedProfile
        });
    } catch (error) {
        if (error.message === "Profile not found") {
            return res.status(404).json({
                success: false,
                message: "Profile not found"
            });
        }

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// app/controllers/profileController.js

userProfileController.deleteProfile = async (req, res) => {
    try {
        const { id } = req.params;

        await userProfile.deleteProfile(id);

        return res.status(200).json({
            success: true,
            message: "Profile Deleted Successfully 😈🔥"
        });
    } catch (error) {
        if (error.message === "Profile not found") {
            return res.status(404).json({
                success: false,
                message: "Profile not found"
            });
        }

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = userProfileController;