const express = require("express");
const mongoose = require("mongoose");
const Hobby = require("../models/Hobby.js");

const hobbyRouter = express.Router();

hobbyRouter.post("/", async (req, res) => {
  try {
    const { name, description, category, frequency, isActive } = req.body;
    const existing = await Hobby.findOne({ name, description });
    if (existing) {
      return res.status(409).json({ error: "this hobby already exists" });
    }
    const hobby = await Hobby.create({
      name,
      description,
      category,
      frequency,
      isActive,
    });

    res.status(201).json(hobby);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

hobbyRouter.get("/", async (req, res) => {
  try {
    const hobbies = await Hobby.find();
    res.status(200).json(hobbies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

hobbyRouter.put("/:id", async (req, res) => {
  try {
    const hobbyId = req.params.id;
    const updatedHobby = await Hobby.findByIdAndUpdate(hobbyId, req.body, {
      new: true,
    });

    res.status(200).json({ message: "Hobby updated", data: updatedHobby });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

hobbyRouter.delete("/:id", async (req, res) => {
  try {
    const hobbyId = req.params.id;
    const hobby = Hobby.findByIdAndDelete(hobbyId);
    res.status(200).json({ message: "Hobby deleted", data: hobby });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

hobbyRouter.get("/:id", async (req, res) => {
  try {
    const hobbyId = req.params.id;
    if (!mongoose.isValidObjectId(hobbyId)) {
      return res.status(400).json("Invalid hobby Id");
    }

    const hobby = Hobby.findById(hobbyId);
    if (!hobby) {
      return res.status(404).json("Hobby not found");
    }

    return res.status(200).json(hobby);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = hobbyRouter;
