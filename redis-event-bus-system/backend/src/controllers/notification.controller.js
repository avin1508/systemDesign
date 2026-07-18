import {
    sendEmail,
    sendSMS,
} from "../services/notification.service.js";

export const sendEmailController = async (req, res) => {

    try {

        const response = await sendEmail(req.body);

        return res.status(201).json({
            success: true,
            message: "Email Notification Event Published",
            data: response,
        });

    } catch (error) {

        console.error("[Email Controller]", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const sendSMSController = async (req, res) => {

    try {

        const response = await sendSMS(req.body);

        return res.status(201).json({
            success: true,
            message: "SMS Notification Event Published",
            data: response,
        });

    } catch (error) {

        console.error("[SMS Controller]", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};