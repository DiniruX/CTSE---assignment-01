const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    requestId: {
      type: String,
      required: true,
    },
    //person who add the requests
    passenger: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      // required: true,
    },
    //person who accept the requests
    vehicleOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    //Thw vehicle details of the person who accept the requests
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
    //status will change to accepted.
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
