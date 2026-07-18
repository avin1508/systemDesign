import { patternSubscribe } from "./subscriber.js";
import { eventDispatcher } from "../dispatchers/event.dispatcher.js";

export const initializePatternSubscriber = async () => {

    await patternSubscribe({
        pattern: "*",
        handler: eventDispatcher,
    });

    console.log("[Pattern Subscriber] Initialized");

};