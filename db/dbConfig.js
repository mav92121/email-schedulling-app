import mongoose from "mongoose";

const MONGO_URL =
  "mongodb+srv://mohsinali530121:sWpQxHyS6CdyfmR3@cluster0.l1vtoje.mongodb.net/";

mongoose.connect(MONGO_URL);

mongoose.connection.on("error", (err) => {
  console.log("error connecting db ", err);
});

mongoose.connection.on("connected", () => {
  console.log("db connected");
});
