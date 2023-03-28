const express = require("express");
const User = require("./model/user/user");
const app = express();
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://armaan:armaan@cluster0.paruxml.mongodb.net/SLHMS",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const bodyParser = require("body-parser");
const session = require("express-session");
const crypto = require("crypto");
const fs = require("fs");
// const cors = require('cors');

// // Use CORS middleware
// app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 5003;

// Set up session middleware
app.use(
  session({
    secret: "supersecretkey",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/api/user", (req, res) => {
  SLHMS.find().then(function (err, devices) {
    if (err == true) {
      return res.send(err);
    } else {
      return res.send(user);
    }
  });
});

// Handle login form submission
app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Hash the password
  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  try {
    // Look for the user in the database
    const user = await SLHMS.findOne({
      username: username,
      password: hashedPassword,
    });

    if (user) {
      // Set session variables
      req.session.username = username;
      req.session.role = user.role;

      // Return success response
      res.status(200).json({ message: "Login successful" });
    } else {
      // If the email and password don't match, return error response
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Handle logout
app.post("/logout", (req, res) => {
  // Clear session variables and return success response
  req.session.destroy(() => {
    res.status(200).json({ message: "Logout successful" });
  });
});

//to register a new user
app.post("/api/user", (req, res) => {
  const { username, password, userType } = req.body;
  const newUser = new User({
    username,
    password,
    role,
  });
  newUser.save((err) => {
    return err
      ? res.status(500).send(err)
      : res.status(201).send("successfully added user and user data");
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
