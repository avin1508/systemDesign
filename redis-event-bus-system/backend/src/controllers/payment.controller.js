import {
    paymentSuccess,
    paymentFailed,
} from "../services/payment.service.js";

export const paymentSuccessController = async (req, res) => {
    try {

        const payment = await paymentSuccess(req.body);

        return res.status(201).json({
            success: true,
            message: "Payment Success Event Published",
            data: payment,
        });

    } catch (error) {

        console.error("[Payment Success Controller]", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const paymentFailedController = async (req, res) => {
    try {

        const payment = await paymentFailed(req.body);

        return res.status(201).json({
            success: true,
            message: "Payment Failed Event Published",
            data: payment,
        });

    } catch (error) {

        console.error("[Payment Failed Controller]", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};