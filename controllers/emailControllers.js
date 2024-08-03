import Email from "../models/Email.js";
import getFormattedDate from "../utils/getFormattedDate.js";
import sendEmail from "../utils/sendEmail.js";
import schedule from "node-schedule";

let jobs = {};
const getAllScheduledEmails = async (req, res) => {
  const emails = await Email.find({});
  return res.json(emails);
};

const getScheduledEmailById = async (req, res) => {
  const { id } = req.params;
  try {
    const email = await Email.findOne({ _id: id });
    return res.json(email);
  } catch (err) {
    console.log("error fetcing email by id", err);
    return res.json(err);
  }
};
const deleteScheduledEmail = async (req, res) => {
  const { id } = req.params;
  const email = await Email.findById(id);
  if (!email) {
    return res.json({ error: "Email not found" });
  }

  const job = jobs[id];
  if (job) {
    job.cancel();
    delete jobs[id];
  }
  await Email.findByIdAndDelete(id);

  res.json({ msg: "Scheduled email deleted successfully" });
};

const scheduleEmail = async (req, res) => {
  const {
    seconds,
    hours,
    minutes,
    day,
    month,
    year,
    subject,
    recipient,
    body,
    attachments,
    recurrenceRule,
  } = req.body;

  if (!hours || !day || !month || !minutes || !seconds || !year) {
    return res.json({ error: "Date, time, and day required" });
  }

  const scheduleTime = getFormattedDate({
    year,
    month,
    day,
    hours,
    minutes,
    seconds,
  });

  const email = await Email.create({
    recipient,
    subject,
    text: body,
    hours,
    month,
    day,
    minutes,
    seconds,
    attachments,
    recurrenceRule,
  });

  res.json({ msg: "success", emailId: email._id });

  let job;
  if (recurrenceRule) {
    // Schedule recurring job
    job = schedule.scheduleJob(recurrenceRule, function () {
      sendEmail({ recipientEmail: recipient, subject, text: body });
    });
  } else {
    // Schedule one-time job
    job = schedule.scheduleJob(scheduleTime, function () {
      sendEmail({ recipientEmail: recipient, subject, text: body });
    });
  }

  jobs[email._id] = job; // Store the job reference
};

export {
  getAllScheduledEmails,
  getScheduledEmailById,
  deleteScheduledEmail,
  scheduleEmail,
};
