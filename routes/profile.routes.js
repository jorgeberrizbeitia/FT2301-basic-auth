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





module.exports = router;