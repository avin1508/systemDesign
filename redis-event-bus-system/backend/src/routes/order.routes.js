import { Router } from "express";

import { createOrderController, readyOrderController, cancelOrderController } from "../controllers/order.controller.js";

const router = Router();

router.post("/", createOrderController);
router.post("/:orderId/ready", readyOrderController);
router.post("/:orderId/cancel", cancelOrderController);

export default router;