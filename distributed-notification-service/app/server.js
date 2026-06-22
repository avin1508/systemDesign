require("dotenv").config();

const app = require("./app");
require("./config/redis");
const connectDB = require("./config/db");

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});