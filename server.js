const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const hobbyRouter = require("./routes/hobbyRoutes.js");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connect");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.use("/api/hobbies", hobbyRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
