import { getIo } from "../../config/socket.js";

export const orderReadyHandler = async (event) => {

    console.log(`
========================================
🟡 ORDER READY
----------------------------------------
`, event);

    const io = getIo();

    io.emit("order.ready", {
        server: process.env.SERVER_NAME,
        ...event.data,
    });

};
