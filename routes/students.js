const express = require("express");
const router = express.Router();
const Students = require("../models/students");

//Getting all
router.get("/", async (req, res) => {
  try {
    const students = await Students.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Getting one
router.get("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let student = await Students.findById(id);
    res.json(student);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

//Creating one
router.post("/", async (req, res) => {
  const student = new Students({
    name: req.body.name,
    address: req.body.address,
    email: req.body.email,
  });
  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Updating one
router.patch("/:id", async (req, res) => {
  let student;
  try {
    student = await Students.findById(req.params.id);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }

  if (req.body.name != null) {
    student.name = req.body.name;
  }
  if (req.body.address != null) {
    student.address = req.body.address;
  }
  if (req.body.email != null) {
    student.email = req.body.email;
  }
  try {
    let updatedStudent = await student.save();
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Deleting one
router.delete("/:id", async (req, res) => {
  try {
    let student = await Students.findById(req.params.id);
    await student.remove();
    res.json({ message: `${student.name} details deleted successfully` });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
