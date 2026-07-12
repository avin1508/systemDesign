import { createClient } from "redis";

const subscriber = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

const startSubscriber = async () => {

    await subscriber.connect();

    console.log("Subscriber Connected");

    await subscriber.subscribe(
        "order-channel",
        (message) => {
            console.log("Received:", message);
        }
    );
};

export default startSubscriber;