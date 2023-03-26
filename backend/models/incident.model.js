const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema({
    incident: {
        type: String,
        //required: true,
    },
    action: {
        type: String,
        //required: true,
        default: "None"
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
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "user",
    //   required: true,
    // },
});

const incidents = new mongoose.model("incidents", incidentSchema);

module.exports = incidents;
