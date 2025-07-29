const mongoose = require("mongoose");

module.exports = dbConfig = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("Db connected!"))
    .catch((err) => console.error("Error:", err));
};
