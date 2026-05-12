const express = require("express");

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {

    console.log(`Request handled by PID: ${process.pid}`);

    // medium heavy work 😈
    let total = 0;

    for (let i = 0; i < 10; i++) {
        total += i;
    }

    res.send(`Response from PID: ${process.pid}`);
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
