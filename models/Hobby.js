const mongoose = require("mongoose");

const hobbySchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is require"], max: 50 },
    description: { type: String, max: 500 },
    category: {
      type: String,
      enum: ["sports", "arts", "music", "gaming", "reading", "other"],
    },
    frequency: { type: String, enum: ["daily", "weekly", "monthly", "rarely"] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Hobby = mongoose.model("Hobby", hobbySchema);

module.exports = Hobby;
