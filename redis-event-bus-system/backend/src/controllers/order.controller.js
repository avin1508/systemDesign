import { createOrder, readyOrder, cancelOrder } from "../services/order.service.js";

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

export const readyOrderController = async (req, res, next) => {
    try {

        const { orderId } = req.params;

        const order = await readyOrder(orderId);

        return res.status(201).json({
            success: true,
            data: order,
        });
    }catch (error){
        next(error);
    }
}

export const cancelOrderController = async (req, res, next) => {
    try {

        const { orderId } = req.params;

        const order = await cancelOrder(orderId);

        return res.status(201).json({
            success: true,
            data: order,
        });
    } catch (error) {
        next(error);
    }
}