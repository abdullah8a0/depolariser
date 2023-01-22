import express from "express";
import auth from "./auth";
import socketManager from "./server-socket";
import Descriptor from "./models/Descriptor";
import { generateDescriptor, fecthResults } from "./placement_alg";
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
router.post("/results", async (req, res) => {
  // get the user's id
  if (!req.user) {
    return res.status(401).send({ err: "Not logged in." });
  }
  const userId = req.user._id;
  console.log(`rescieved testObj from ${userId}: ${JSON.stringify(req.body.testObj)}`);
  console.log(`its type is ${typeof req.body.testObj}`);

  // generate the descriptor from the request body
  const newDescriptor = generateDescriptor(JSON.parse(req.body.testObj), userId);

  const descriptors = await Descriptor.findOneAndReplace(
    { userId: userId },
    { userId: userId, DescVector: newDescriptor.DescVector },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  // get the user's results
  const results = fecthResults(descriptors);
  // send the results tso the client
  res.send({ results: results });
  return;
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  const msg = `Api route not found: ${req.method} ${req.url}`;
  res.status(404).send({ msg });
});

export default router;
