const { application } = require("express");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { body, check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const authenticate = require("../middlewares/authenticate");

//get all Users
router.get("/", async (req, res) => {
  let users = await User.find({});
  res.send(users);
});

router.post(
  "/register",
  [
    check("name").notEmpty().withMessage("name is required"),
    check("email")
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("email is not valid email"),
    check("password").notEmpty().withMessage("password is required"),
  ],
  async (req, res) => {
    const { name, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      let user = await User.findOne({
        email,
      });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }
      //encrypt the password
      let salt = await bcrypt.genSalt(10);
      let encryptedPassword = await bcrypt.hash(password, salt);
      let newUser = new User({
        name,
        email,
        password: encryptedPassword,
      });
      let savedUser = await newUser.save();
      return res
        .status(200)
        .json({ message: "Registration successfull!!!", user: savedUser });
    }
  }
);

router.post(
  "/login",
  [
    check("email")
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("email is not valid email"),
    check("password").notEmpty().withMessage("password is required"),
  ],
  async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      let user = await User.findOne({
        email,
      });
      if (user) {
        //console.log(user.id);
        //compare password
        let isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isPasswordMatch) {
          //create JWT token
          let payload = {
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin,
            },
          };

          jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            { expiresIn: 3600000 },
            (error, token) => {
              if (error) throw error;
              res.status(200).json({
                message: "Login success",
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  isAdmin: user.isAdmin,
                },
              });
            }
          );
        } else {
          return res.status(400).json({ message: "Invalid credentials" });
        }
      } else {
        return res.status(400).json({ message: "User not found" });
      }
    }
  }
);

//update User
// { new: true } should be passed as an option to get the updated product as response.
router.put(
  "/updateuser",
  [
    check("name").notEmpty().withMessage("name is required"),
    check("email")
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("email is not valid email"),
  ],
  (req, res) => {
    let updatedUser = {
      name: req.body.name,
      email: req.body.email,
    };
    User.findOneAndUpdate(
      email,
      { $set: updatedUser },
      { new: true },
      (err, document) => {
        if (err) {
          res.status(400).json({ err: err });
        } else {
          res
            .status(200)
            .json({ message: "User updated successfully", User: document });
        }
      }
    );
  }
);

router.delete(
  "/deleteuser",
  authenticate,
  [
    check("email")
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("email is not valid email"),
  ],
  async (req, res) => {
    const { email } = req.body;
    let isAdmin = req.user.isAdmin;
    console.log(isAdmin);
    if (isAdmin) {
      if (email) {
        let user = await User.findOne({
          email,
        });
        if (user) {
          await User.findOneAndDelete({ email }, (err, document) => {
            if (err) {
              res.status(400).json({ err: err });
            } else {
              res.status(200).json({
                message: "User deleted successfully",
                user: document,
              });
            }
          });
        } else {
          return res.status(400).json({
            message: `User not found with email: ${email}`,
          });
        }
      } else {
        return res.status(400).json({ message: `User email cannot be empty` });
      }
    } else {
      return res
        .status(401)
        .json({ message: `Current user is not authorized to delete the user` });
    }
  }
);

module.exports = router;
