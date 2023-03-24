const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

/* The above code is a route handler for the /register route. It is used to register a new user. */
router.post("/register", async (req, res) => {
  try {
    /* Checking if the email is already in the database. */
    const user = await User.findOne({ email: req.body.email });

    /* Checking if the email is already in the database. */
    if (user)
      return res.status(400).json({
        errorMessage: "An account with this email already exists.",
      });

    // hash the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(req.body.password, salt);

    // save a new user account to the db
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      mobile: req.body.mobile,
      passwordHash: passwordHash,
    });

    /* Saving the new User to the database. */
    await newUser.save();

    /* Sending a response to the client. */
    res.status(201).send({ Message: "User added successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.post("/add", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      mobile: req.body.mobile,
      dob: req.body.dob,
      userType: req.body.userType,
      passwordHash: passwordHash,
    });

    await newUser.save();

    res.status(201).send({ Message: "User added successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

/* This is a route handler for the /profile route. It is used to get the user information. */
router.get("/get/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

/* This is a route handler for the / route. It is used to get all the users. */
router.get("/getAll", async (req, res) => {
  try {
    const users = await User.find();
    /* Sending the users object to the client. */
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

/* This is a route handler for the update route. It is updating the user account. */
router.put("/update/:id", async (req, res) => {
  try {
    /* Updating the user account. */
    await User.findByIdAndUpdate(req.params.id, req.body).exec();

    res.status(201).send({ Message: "Successfully updated the user." });
  } catch (err) {
    res.json(false);
    console.error(err);
    res.status(500).send(err);
  }
});

/* Deleting the user account. */
router.delete("/delete/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    /* Sending a response to the client. */
    res.status(201).send({ Message: "Successfully deleted" });
  } catch (err) {
    res.json(false);
    console.error(err);
    res.status(500).send();
  }
});

router.post("/login", async (req, res) => {
  try {
    /* Finding the user by email. */
    console.log(req.body)
    const user = await User.findOne({ email: req.body.email });
    console.log(user)
    if (!user) {
      return res.status(401).json({ errorMessage: "Wrong email or password." });
    }

    /* Comparing the password entered by the user with the password stored in the database. */
    const passwordCorrect = await bcrypt.compare(
      req.body.password,
      user.passwordHash
    );

    if (!passwordCorrect) {
      return res.status(401).json({ errorMessage: "Wrong email or password." });
    }

    return res.send({ type: user.userType, userId: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

module.exports = router;
