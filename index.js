const dbConfig = require("./config/db.js");
require("dotenv").config();
require("./model");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const errorMiddleware = require("./middleware/Error.js");
const router = require("./routes/index.js");

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("working done!").status(200);
});

app.use("/api/v1", router);

app.use(errorMiddleware);

dbConfig();

app.listen(process.env.PORT || 8000, () => {
  console.log(`server listen at ${process.env.PORT}`);
});
