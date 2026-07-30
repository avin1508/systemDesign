import { getIo } from "../../config/socket.js";

export const paymentFailedHandler = async (event) => {

    console.log(`
========================================
🔴 PAYMENT FAILED
----------------------------------------
`, event);

    const io = getIo();

    io.emit("payment.failed", {
        server: process.env.SERVER_NAME,
        ...event.data,
    });

    // Future:
    // Retry Payment
    // Send Failure Notification
    // Alert Support Team
};
