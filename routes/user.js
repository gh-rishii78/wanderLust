const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares.js");
const userController = require("../controllers/user.js");
// Signup User - 
// 1. GET /signup
// 2. POST /signup
router.route("/signup")
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.signup))

// Login User -
// 1. GET /login
// 2. POST /login
router.route("/login")
    .get(userController.renderLoginForm)
    .post(
        saveRedirectUrl,
        passport.authenticate('local', {
            failureRedirect: "/login",
            failureFlash: true
        }),
        wrapAsync(userController.login)
    )

// Logout User -
// GET /logout
router.get("/logout", userController.logout);

module.exports = router;