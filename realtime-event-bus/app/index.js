import dotenv from "dotenv";
dotenv.config();

import express from "express";
import redisClient from "./config/redis.js";

import startSubscriber from "./subscriber/subscriber.js";
import startSubscriber2 from "./subscriber/subscriber2.js";
import startSubscriber3 from "./subscriber/subscriber3.js";
import publishMessage from "./publisher/publisher.js";

const app = express();

const startServer = async () => {
    await redisClient.connect();
    console.log("Connected to Redis");

    await startSubscriber();
    await startSubscriber2();
    await startSubscriber3();

    app.listen(3000, () => {
        console.log("Server started on port 3000");

        setInterval(async () => {
            await publishMessage();
        }, 5000);
    });
};

startServer();