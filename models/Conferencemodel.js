const mongoose = require("mongoose");

const conferenceSchema = new mongoose.Schema(
  {
    roomCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    participants: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        joinedAt: { type: Date, default: Date.now },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    endedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Auto-expire inactive rooms after 24 hours
conferenceSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

const Conference = mongoose.model("Conference", conferenceSchema);
module.exports = Conference;