/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

const mongoose = require("mongoose"); // library to connect to MongoDB
const mongoConnectionURL =
  "mongodb+srv://admin:AeY_-PSPTdjM$3*@cluster0.lm9nay9.mongodb.net/?retryWrites=true&w=majority";
// TODO change database name to the name you chose
const databaseName = "Cluster0";

// import models so we can interact with the database
const User = require("./models/user");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }
n
  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// save the value test for the current user into the database
router.get("/save_val", (req, res) => {
  // do nothing if user not logged in
  if (!req.user) {
    return res.send({ msg: "not logged in" });
  }

  // save the value test for the current user
  User.findOneAndUpdate({ _id: req.user._id }, { test: 42 }, { new: true }, (err, doc) => {
    if (err) {
      console.log("Something wrong when updating data!");
    }

    console.log(doc);
  });

  res.send({ msg: "saved" });
});

// get the value test for the current user from the database
router.get("/get_val", async (req, res) => {
  // do nothing if user not logged in
  if (!req.user) {
    return res.send({ msg: "not logged in" });
  }

  // get the value test for the current user
  const val = User.find({ _id: req.user._id }).then((user) => {
    return user[0].test;
  });

  res.send({ msg: "got", val: await val });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
