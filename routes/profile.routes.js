const express = require('express');
const router = express.Router();

const { isLoggedIn, isAdmin } = require("../middlewares/auth-middlewares.js")

// GET "/profile" => renderiza una vista privada
router.get("/", isLoggedIn, isAdmin, (req, res, next) => {

  // console.log(req.session.activeUser)
  // if (req.session.activeUser === undefined) {
  //   res.redirect("/auth/login")
  //   return
  // } 
  
  res.render("profile/private.hbs")

})

router.post("/create-document", (req, res, next) => {

  // ejemplo de ruta donde el usuario crea algo

  // ! tenemos acceso a req.session.activeUser._id para saber quien está creando el documento

})


router.get("/my-friend", (req, res, next) => {

  //codigo que necesito

})


module.exports = router;