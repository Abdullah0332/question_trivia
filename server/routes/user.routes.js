const express = require("express");
const sanitizeData = require("../middlewares/sanitize.js");

const {
  sign_in,
  update_points,
  logged_in_user,
} = require("../controllers/user.controller.js");

const router = express.Router();

router.post("/sign-in", sanitizeData, sign_in);

router.get("/logged-in-user/:id", sanitizeData, logged_in_user);

router.put("/update-points/:id", sanitizeData, update_points);

module.exports = router;
