import { Router } from "express";

import {
    paymentSuccessController,
    paymentFailedController,
} from "../controllers/payment.controller.js";

const router = Router();

router.post(
    "/success",
    paymentSuccessController
);

router.post(
    "/failed",
    paymentFailedController
);

export default router;