import express from "express";
import auth from "./auth";
import socketManager from "./server-socket";
import Descriptor from "./models/Descriptor";
import DescriptorInterface from "../shared/Descriptor";
import { generateDescriptor, fecthResults } from "./placement_alg";
import { assert } from "console";
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
router.post("/test", async (req, res) => {
  // display the request body
  assert(req.user!._id === "63cb0ff63162746b869961ac", `User ID is ${req.user!._id}`);
  const newDescriptor = generateDescriptor(req.body, req.user!._id);
  newDescriptor.save();
  res.send({});
  // Write to mongoDB
});
router.post("/results", async (req, res) => {
  // get the user's id
  const userID = req.user!._id;
  // remove the quotes from the i

  const descriptors = Descriptor.findOne({
    userId: userID,
  }).then((descriptor: DescriptorInterface | null | undefined) => {
    if (descriptor === null || descriptor === undefined) {
      // generate the descriptor from the request body
      const newDescriptor = generateDescriptor(req.body.testObj, userID);
      // save the descriptor to the database
      return newDescriptor.save();
    }
    return descriptor;
  });
  // get the user's results
  const results = fecthResults(await descriptors);
  // send the results to the client
  res.send({ results: results });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  const msg = `Api route not found: ${req.method} ${req.url}`;
  res.status(404).send({ msg });
});

export default router;
