import express from "express";
import auth from "./auth";
import socketManager from "./server-socket";
import Descriptor from "./models/Descriptor";
import DescriptorInterface from "../shared/Descriptor";
import { generateDescriptor } from "./placement_alg";
const router = express.Router();

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // Not logged in.
    return res.send({});
  }
  res.send(req.user);
});
router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) {
    const socket = socketManager.getSocketFromSocketID(req.body.socketid);
    if (socket !== undefined) socketManager.addUser(req.user, socket);
  }
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|
/**
 * @api {post} /api/test Test API
 * @apiName Test
 *
 * Generates the description vector from the user's selections
 * Saves the description vector to the database
 */
router.post("/test", (req, res) => {
  // display the request body
  console.log(JSON.stringify(req.body));
  const newDescriptor = generateDescriptor(req.body);
  newDescriptor.save();
  res.send({});
  // Write to mongoDB
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  const msg = `Api route not found: ${req.method} ${req.url}`;
  res.status(404).send({ msg });
});

export default router;
