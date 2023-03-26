const express = require("express");
const incidents = require("../models/incident.model");
const router = express.Router();


//Crete an incident

router.post("/add", async (req, res) => {
    try {
        await incidents.findOne({ email: req.body.email });

        const addIncident = new incidents({
            incident: req.body.incident,
            action: req.body.action,
            passenger: req.body.passenger,
            vehicleOwner: req.body.vehicleOwner,
            vehicle: req.body.vehicle,
        })
        await addIncident.save();
         /* Sending a response to the user. */
        res.status(201).send({ Message: "Incident added successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});


//Get incident data

router.get('/view', async (req, res) => {
    try {
        const incident = await incidents.find();
        res.status(201).json(incident);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


//Get individual incident

router.get("/view/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const incidentindividual = await incidents.findById(id);
        res.status(201).json(incidentindividual);
    } catch (error) {
        res.status(500).json(error);
    }
});


//Update incident data

router.put("/update/:id", async (req, res) => {
    try {
        await incidents.findByIdAndUpdate(req.params.id, req.body).exec();
  
        res.status(201).send({ Message: "Successfully updated the incident." });
    } catch (err) {
        res.json(false);
        console.error(err);
        res.status(500).send(err);
    }
});


//Delete incident

router.delete("/delete/:id", async (req, res) => {
    try {
        await incidents.findByIdAndDelete(req.params.id);
  
        res.status(201).send({ Message: "Successfully deleted" });
    } catch (err) {
        res.json(false);
        console.error(err);
        res.status(500).send();
    }
});

module.exports = router;
