import { getIo } from "../../config/socket.js";

export const paymentSuccessHandler = async (event) => {

    console.log(`
========================================
🟢 PAYMENT SUCCESS
----------------------------------------
`, event);

    const io = getIo();

    io.emit("payment.success", {
        server: process.env.SERVER_NAME,
        ...event.data,
    });

    // Future:
    // Update Order Status
    // Generate Invoice
    // Notify Customer
    // Analytics
};
