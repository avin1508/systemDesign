import { getIo } from "../../config/socket.js";

export const emailHandler = async (event) => {

    console.log(`
========================================
📧 EMAIL SENT
----------------------------------------
`, event);

    const io = getIo();

    io.emit("notification.email", {
        server: process.env.SERVER_NAME,
        ...event.data,
    });

};
