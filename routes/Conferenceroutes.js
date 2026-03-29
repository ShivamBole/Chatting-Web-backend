const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Conference = require("../models/Conferencemodel");
const { protect } = require("../middleware/authMiddleware");

// Generate a random room code like "ABCD-EFGH"
const generateRoomCode = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no ambiguous chars O,0,I,1
  const seg = () =>
    Array.from({ length: 4 }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join("");
  return `${seg()}-${seg()}`;
};

// ── POST /api/conference/create ──────────────────────
// Creates a new conference room and returns the room code
router.post(
  "/create",
  protect,
  asyncHandler(async (req, res) => {
    let roomCode;
    let exists = true;

    // Keep generating until we get a unique code
    while (exists) {
      roomCode = generateRoomCode();
      exists = await Conference.findOne({ roomCode, isActive: true });
    }

    const conference = await Conference.create({
      roomCode,
      createdBy: req.user._id,
    });

    res.status(201).json({
      roomCode: conference.roomCode,
      _id: conference._id,
    });
  })
);

// ── GET /api/conference/validate/:roomCode ───────────
// Checks if a room code is valid and active before joining
router.get(
  "/validate/:roomCode",
  protect,
  asyncHandler(async (req, res) => {
    const roomCode = req.params.roomCode.toUpperCase();
    const conference = await Conference.findOne({ roomCode, isActive: true });

    if (!conference) {
      res.status(404);
      throw new Error("Room not found or has ended.");
    }

    res.json({
      valid: true,
      roomCode: conference.roomCode,
      _id: conference._id,
    });
  })
);

// ── PATCH /api/conference/end/:roomCode ──────────────
// Marks a room as ended (only creator can end)
router.patch(
  "/end/:roomCode",
  protect,
  asyncHandler(async (req, res) => {
    const roomCode = req.params.roomCode.toUpperCase();
    const conference = await Conference.findOne({ roomCode, isActive: true });

    if (!conference) {
      res.status(404);
      throw new Error("Room not found.");
    }

    if (conference.createdBy.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error("Only the host can end the meeting.");
    }

    conference.isActive = false;
    conference.endedAt = new Date();
    await conference.save();

    res.json({ message: "Meeting ended." });
  })
);

module.exports = router;