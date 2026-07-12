import { createClient } from "redis";

const subscriber2 = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

const startSubscriber2 = async () => {

    await subscriber2.connect();

    console.log("Subscriber-2 Connected");

    await subscriber2.subscribe(
        "order-channel",
        (message) => {
            console.log("Subscriber-2 Received:", message);
        }
    );
};

export default startSubscriber2;