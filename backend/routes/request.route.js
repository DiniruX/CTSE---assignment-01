const router = require("express").Router();
const Request = require("../models/request.model");

/* Adding a new request */
router.post("/add", async (req, res) => {
  try {
    const newRequest = new Request({
      requestId: "REQ" + Math.floor(Math.random() * 900000 + 100000),
      passenger: req.body.passenger,
      vehicleOwner: req.body.vehicleOwner,
      vehicle: req.body.vehicle,
      locationFrom: req.body.locationFrom,
      locationTo: req.body.locationTo,
      dateAndTime: req.body.dateAndTime,
      noOfSeats: req.body.noOfSeats,
      status: req.body.status,
    });

    const result = await newRequest.save();

    res
      .status(201)
      .send({ message: "Request Sent Successfully", data: result });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

/* Update a request */
router.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Request.findByIdAndUpdate(id, req.body).exec();
    res.status(200).send({ message: "Updated Successfully", data: result });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

/* Delete a request */
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Request.findByIdAndDelete(id).exec();
    res.status(200).send({ message: "Deleted Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

/* Update request status */
router.put("/status/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Request.findByIdAndUpdate(id, {
      status: req.body.status,
    }).exec();
    res
      .status(200)
      .send({ message: "Status Updated Successfully", data: result });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

/* Get All Requests */
router.get("/getAll", async (req, res) => {
  try {
    const result = await Request.find({ status: "Requested" })
      .populate("passenger")
      .populate("vehicleOwner")
      .populate("vehicle");
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

/* Get Ride By Id */
// router.get("/ride/:id", async (req, res) => {
//   try {
//     const result = await Request.find({ _id: req.params.id })
//       .populate("passenger")
//       .populate("vehicleOwner")
//       .populate("vehicle");
//     res.status(200).send(result);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send(err);
//   }
// });

/* Get Ride By Id */
// router.get("/ride/:id", async (req, res) => {
//   try {
//     const result = await Request.find({ _id: req.params.id })
//       .populate("passenger")
//       .populate("vehicleOwner")
//       .populate("vehicle");
//     res.status(200).send(result);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send(err);
//   }
// });

module.exports = router;
