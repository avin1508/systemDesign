import { getIo } from "../../config/socket.js";

export const orderCancelledHandler = async (event) => {

    console.log(`
========================================
🔴 ORDER CANCELLED
----------------------------------------
`, event);

    const io = getIo();

    io.emit("order.cancelled", {
        server: process.env.SERVER_NAME,
        ...event.data,
    });

};
