import {
    publishEmailNotification,
    publishSMSNotification,
} from "../publishers/notification.publisher.js";

export const sendEmail = async (payload) => {

    // Future:
    // Integrate Nodemailer / SES / SendGrid

    await publishEmailNotification(payload);

    return payload;
};

export const sendSMS = async (payload) => {

    // Future:
    // Integrate Twilio / MSG91 / AWS SNS

    await publishSMSNotification(payload);

    return payload;
};