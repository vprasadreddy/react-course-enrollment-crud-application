const { application } = require("express");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Course = require("../models/Course");
const { v4: uuidv4 } = require("uuid");
const { body, check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const authenticate = require("../middlewares/authenticate");

//get all Courses
router.get("/", async (req, res) => {
  let courses = await Course.find({ isActive: true });
  res.send(courses);
});

router.post(
  "/add",
  authenticate,
  [check("name").notEmpty().withMessage("Course name is required")],
  async (req, res) => {
    const { name } = req.body;
    let courseid = uuidv4();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      let isAdmin = req.user.isAdmin;
      if (isAdmin) {
        try {
          let course = await Course.findOne({
            name,
          });
          if (course) {
            return res.status(400).json({ message: "course already exists" });
          }
          let newCourse = new Course({
            name,
            courseid,
          });
          let savedCourse = await newCourse.save();
          return res.status(200).json({
            message: "Course added successfully",
            course: savedCourse,
          });
        } catch (error) {
          return res.status(400).json({ message: error });
        }
      } else {
        return res
          .status(401)
          .json({ message: `User is not authorized to add the course` });
      }
    }
  }
);

//update Course
// { new: true } should be passed as an option to get the updated product as response.
router.put(
  "/update",
  authenticate,
  [
    check("name").notEmpty().withMessage("name is required"),
    check("courseid").notEmpty().withMessage("email is required"),
  ],
  (req, res) => {
    let isAdmin = req.user.isAdmin;
    if (isAdmin) {
      let { name, courseid } = req.body;
      let updatedCourse = {
        name,
        courseid,
      };
      Course.findOneAndUpdate(
        courseid,
        { $set: updatedCourse },
        { new: true },
        (err, document) => {
          if (err) {
            res.status(400).json({ err: err });
          } else {
            res.status(200).json({
              message: "Course updated successfully",
              course: document,
            });
          }
        }
      );
    } else {
      return res
        .status(401)
        .json({ message: `User is not authorized to update the course` });
    }
  }
);

//delete course
router.put(
  "/updatecourse",
  authenticate,
  [check("courseid").notEmpty().withMessage("courseid is required")],
  async (req, res) => {
    const { courseid } = req.body;
    let isAdmin = req.user.isAdmin;
    if (isAdmin) {
      if (courseid) {
        let course = await Course.findOne({
          courseid,
        });
        if (course) {
          await Course.findOneAndUpdate(
            { courseid },
            { $set: { isActive: false } },
            { new: true },
            (err, document) => {
              if (err) {
                res.status(400).json({ err: err });
              } else {
                res.status(200).json({
                  message: "Course deleted successfully",
                  course: document,
                });
              }
            }
          );
        } else {
          return res.status(400).json({
            message: `Course not found with name: ${name}`,
          });
        }
      } else {
        return res.status(400).json({ message: `Course name cannot be empty` });
      }
    } else {
      return res
        .status(401)
        .json({ message: `User is not authorized to delete the course` });
    }
  }
);
module.exports = router;
