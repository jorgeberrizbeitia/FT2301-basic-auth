const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


const authRoutes = require("./auth.routes.js")
router.use("/auth", authRoutes)

// router.use("/auth", require("./auth.routes.js")) // sintaxis en una sola linea


module.exports = router;
