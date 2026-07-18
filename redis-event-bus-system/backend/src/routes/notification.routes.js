import { Router } from "express";

import {
    sendEmailController,
    sendSMSController,
} from "../controllers/notification.controller.js";

const router = Router();

router.post(
    "/email",
    sendEmailController
);

router.post(
    "/sms",
    sendSMSController
);

export default router;