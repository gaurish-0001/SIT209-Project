const mongoose = require("mongoose");

const temperatureSchema = new mongoose.Schema({
  device_id: {
    type : String,
  },
  temperature: {
    type: Number,
  },
  unit: {
    type: String,
    enum: ["C", "F"],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Temperature = mongoose.model("Temperature", temperatureSchema);

module.exports = Temperature;