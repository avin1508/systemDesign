import { createOrder } from "../services/order.service.js";

export const createOrderController = async (req, res, next) => {
    try {

        const order = await createOrder(req.body);

        return res.status(201).json({
            success: true,
            data: order,
        });

    } catch (error) {
        next(error);
    }
};