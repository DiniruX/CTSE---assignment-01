const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    requestId: {
      type: String,
      required: true,
    },
    passenger: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    vehicleOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vehicle",
    },
    locationFrom: {
      type: String,
      required: true,
    },
    locationTo: {
      type: String,
      required: true,
    },
    dateAndTime: {
      type: Date,
      required: true,
    },
    noOfSeats: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "Requested",
    },
  },
  {
    timestamps: true,
  }
);

const Request = mongoose.model("request", requestSchema);

module.exports = Request;
