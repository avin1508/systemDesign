export const registerSocketHandlers = (io) => {

    io.on("connection", (socket) => {

        console.log(
            `[${process.env.SERVER_NAME}] Client Connected : ${socket.id}`
        );

        socket.on("disconnect", () => {
            console.log(
                `[${process.env.SERVER_NAME}] Client Disconnected : ${socket.id}`
            );
        });

    });

};