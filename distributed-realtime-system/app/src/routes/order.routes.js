import { Router } from "express";
import { markOrderAsReady } from "../controllers/order.controller.js";

const router = Router();

router.put("/:orderId/ready", markOrderAsReady);

export default router;