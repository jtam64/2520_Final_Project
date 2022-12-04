const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => res.render("auth/login"));

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/reminders",
    failureRedirect: "/auth/login",
  })
);

router.get("/register", forwardAuthenticated, (req, res) => res.render("auth/register"));

router.get("/logout", (req, res) => {
  req.logout(function(err){
    if (err)
    {
      return next(err);
    }});
  
  res.redirect("/auth/login");
});

module.exports = router;
