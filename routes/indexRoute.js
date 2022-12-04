const express = require("express");
const router = express.Router();
const reminderController = require("../controller/reminder_controller");
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

router.get("/reminders", ensureAuthenticated, reminderController.list);

router.get("/reminder/new",ensureAuthenticated, reminderController.new);

router.get("/reminder/:id",ensureAuthenticated, reminderController.listOne);

router.get("/reminder/:id/edit", reminderController.edit);

router.post("/reminder/",ensureAuthenticated, reminderController.create);

// Implement this yourself
router.post("/reminder/update/:id",ensureAuthenticated, reminderController.update);

// Implement this yourself
router.post("/reminder/delete/:id",ensureAuthenticated, reminderController.delete);

module.exports = router;
