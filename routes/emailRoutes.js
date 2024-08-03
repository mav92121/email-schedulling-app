import express from "express";
import {
  getAllScheduledEmails,
  getScheduledEmailById,
  deleteScheduledEmail,
  scheduleEmail,
} from "../controllers/emailControllers.js";

const emailRoutes = express.Router();

emailRoutes.get("/scheduled-emails", getAllScheduledEmails);
emailRoutes.get("/scheduled-emails/:id", getScheduledEmailById);
emailRoutes.delete("/scheduled-emails/:id", deleteScheduledEmail);
emailRoutes.post("/schedule-email", scheduleEmail);

export default emailRoutes;
