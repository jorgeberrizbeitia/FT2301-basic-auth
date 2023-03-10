const express = require('express');
const router = express.Router();

// ejecuta el middleware que actualiza las variables de si el usuario está logeado o no
const { updateLocals } = require("../middlewares/auth-middlewares.js")
router.use(updateLocals)


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


const authRoutes = require("./auth.routes.js")
router.use("/auth", authRoutes)

// router.use("/auth", require("./auth.routes.js")) // sintaxis en una sola linea

const profileRoutes = require("./profile.routes.js")
router.use("/profile", profileRoutes)


module.exports = router;
