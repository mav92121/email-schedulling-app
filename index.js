import "./db/dbConfig.js";
import express from "express";
import Email from "./models/Email.js";
import mongoose from "mongoose";
import emailRoutes from "./routes/emailRoutes.js";
import sendEmail from "./utils/sendEmail.js";
import "dotenv/config";
const app = express();

app.use(express.json());
app.use("/", emailRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`server listening at ${port}`);
});
