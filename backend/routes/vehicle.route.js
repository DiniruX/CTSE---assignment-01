const router = require("express").Router();
const Vehicle = require("../models/vehicle.model");

router.post("/add", async (req, res) => {
  try {
    await Vehicle.findOne({ email: req.body.email });

    const newVehicle = new Vehicle({
      user: req.body.user,
      make: req.body.make,
      model: req.body.model,
      plateNo: req.body.plateNo,
      passengers: req.body.passengers,
      registered: req.body.registered,
      vehicleType: req.body.vehicleType,
    });

    await newVehicle.save();

    /* Sending a response to the client. */
    res.status(201).send({ Message: "Vehicle added successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.get("/getByUser/:id", async (req, res) => {
  try {
    const vehicle = await Vehicle.find({ user: req.params.id });
    res.json(vehicle);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    await Vehicle.findByIdAndUpdate(req.params.id, req.body).exec();

    res.status(201).send({ Message: "Successfully updated the vehicle." });
  } catch (err) {
    res.json(false);
    console.error(err);
    res.status(500).send(err);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);

    res.status(201).send({ Message: "Successfully deleted" });
  } catch (err) {
    res.json(false);
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
