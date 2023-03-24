const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "user",
    //   required: true,
    // },
    make: { type: String },
    makeHide: { type: Boolean, default: false },
    model: { type: String },
    modelHide: { type: Boolean, default: false },
    plateNo: { type: String },
    plateNoHide: { type: Boolean, default: false },
    passengers: { type: Number },
    passengersHide: { type: Boolean, default: false },
    registered: { type: Boolean, default: false },
    registeredHide: { type: Boolean, default: false },
    vehicleType: { type: String },
  },
  { timestamps: true }
);

const Vehicle = new mongoose.model("vehicles", VehicleSchema);

module.exports = Vehicle;
