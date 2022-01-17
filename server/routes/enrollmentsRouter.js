const { application } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");
const User = require("../models/User");
const { body, check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const authenticate = require("../middlewares/authenticate");

//View my enrollments
router.get("/viewMyEnrollments", authenticate, async (req, res) => {
  let userid = req.user.id;
  let enrollment = await Enrollment.aggregate([
    {
      $lookup: {
        from: "courses",
        localField: "courseid",
        foreignField: "_id",
        as: "courses",
      },
    },
  ]);
  res.status(200).send(enrollment);
});

//Enroll in a course
router.post("/enrollCourse", authenticate, async (req, res) => {
  let userid = req.user.id;
  let user = req.user.name;
  let email = req.user.email;
  //console.log(req.user);
  let { courseid } = req.body;
  let courseObjectId = mongoose.Types.ObjectId(courseid);
  //console.log(courseid);
  let isCourseAlreadyEnrolled = await Enrollment.find({ userid, courseid });
  let course = await Course.findOne({ _id: courseObjectId });
  let courseName;
  if (course) {
    courseName = course.name;
  }
  if (isCourseAlreadyEnrolled.length > 0) {
    res.status(400).json({
      error: "Course already enrolled for the user",
      course: { courseid, courseName, user, email },
    });
  } else {
    let enrollment = new Enrollment({
      userid,
      courseid,
    });
    let enrolledCourse = await enrollment.save();
    res.status(200).json(enrolledCourse);
  }
});

module.exports = router;
