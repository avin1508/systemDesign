import { createClient } from "redis";

const subscriber3 = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

const startSubscriber3 = async () => {

    await subscriber3.connect();

    console.log("Subscriber-3 Connected");

    await subscriber3.subscribe(
        "order-channel",
        (message) => {
            console.log("Subscriber-3 Received:", message);
        }
    );
};

export default startSubscriber3;