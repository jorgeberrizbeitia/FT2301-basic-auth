const express = require('express');
const router = express.Router();

// GET "/profile" => renderiza una vista privada
router.get("/", (req, res, next) => {

  res.render("profile/private.hbs")

})



module.exports = router;