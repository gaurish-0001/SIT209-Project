const mongoose = require("mongoose");

module.exports = mongoose.model(
  "SmartLectureHall",
  new mongoose.Schema(
    {
      username: String,
      password: String,
      role: String,
    },
    { collection: "SLHMS" }
  )
);
