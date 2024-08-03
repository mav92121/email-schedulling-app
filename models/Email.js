import mongoose from "mongoose";

const emailSchema = mongoose.Schema({
  recipient: String,
  subject: String,
  text: String,
  hours: Number,
  month: Number,
  day: Number,
  minutes: Number,
  seconds: Number,
  year: Number,
  attachments: Array,
  recurrenceRule: Object,
});

const Email = mongoose.model("Email", emailSchema);

export default Email;
