const express = require("express");
const { userAuth } = require("../middleware/auth");
const connectionsRequests = require("../models/connectionsRequests");
const User = require("../models/User");

const requestRouter = express.Router();

requestRouter.post("/send/:status/:touserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id; // logged-in user
    const toUserId = req.params.touserId;
    const status = req.params.status;

    const allowedStatus = ["ignored", "interested"];
    const toUser = await User.findById(toUserId);

    if (!toUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    if (!allowedStatus.includes(status)) {
      return res
        .status(400)
        .json({ message: "Invalid request status", status });
    }

    // check for existing connection request
    const existingConnectionRequest = await connectionsRequests.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (existingConnectionRequest) {
      return res
        .status(400)
        .json({ message: "Connection request already exists" });
    }

    const newConnectionRequest = new connectionsRequests({
      fromUserId,
      toUserId,
      status,
    });

    const connectionRequestData = await newConnectionRequest.save();

    res.json({
      message: req.user.firstName + status + " in/at " + toUser.firstName,
      data: connectionRequestData,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      if (!loggedInUser) {
        return res.status(400).json({ message: "Invalid user" });
      }

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid review", status });
      }

      const connectionRequest = await connectionsRequests.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      if (!connectionRequest) {
        return res
          .status(404)
          .json({ message: "Connection request not found" });
      }

      connectionRequest.status = status;
      const data = await connectionRequest.save();

      return res.status(200).json({
        message: `Connection request ${status}`,
        data,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = requestRouter;
