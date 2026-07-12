import { markOrderAsReadyService } from "../services/order.service.js";

export const markOrderAsReady = async (req, res, next) => {
    try {
        const { orderId } = req.params;

        const result = await markOrderAsReadyService(orderId);

        return res.status(200).json({
            success: true,
            message: "Order marked as ready.",
            data: result,
        });

    } catch (error) {
        next(error);
    }
};