const express = require("express");
const rateLimiter = require("express-rate-limit");

const router = express.Router();
const authenicateUser = require("../middleware/authentication");
const testUser = require("../middleware/test-user");
const { register, login, updateUser } = require("../controllers/auth");

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: {
    msg: "Too many request from this IP, please try again after 15 minutes",
  },
});

router.post("/register", apiLimiter, register);
router.post("/login", apiLimiter, login);
router.patch("/updateUser", authenicateUser, testUser, updateUser);

module.exports = router;
