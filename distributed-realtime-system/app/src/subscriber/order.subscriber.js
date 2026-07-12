import { createClient } from "redis";

import { CHANNELS } from "../constants/channels.js";
import { getIO } from "../config/socket.js";

const subscriber = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
    },
});


export const startOrderSubscriber = async () => {

    await subscriber.connect();

    console.log("[Order Subscriber] Connected");

    await subscriber.subscribe(
        CHANNELS.ORDER_EVENTS,
        (message) => {

            const payload = JSON.parse(message);

            console.log(
                `[Order Subscriber] Received ORDER_READY for Order: ${payload.orderId}`
            );

            const io = getIO();

            io.emit("order-ready", payload);
        }
    );
};
