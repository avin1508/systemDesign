import { getIo } from "../../config/socket.js";

export const smsHandler = async (event) => {

    console.log(`
========================================
📱 SMS SENT
----------------------------------------
`, event);

    const io = getIo();

    io.emit("notification.sms", {
        server: process.env.SERVER_NAME,
        ...event.data,
    });

};
