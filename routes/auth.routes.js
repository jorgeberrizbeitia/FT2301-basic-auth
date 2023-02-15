const express = require('express');
const router = express.Router();


// GET "/auth/signup" => renderizar el formulario de registro
router.get("/signup", (req, res, next) => {
  res.render("auth/signup-form.hbs")
})

// POST "/auth/signup" => recibir la info del formulario y crear el perfil de usuario
router.post("/signup", (req, res, next) => {
  console.log(req.body)
  const { username, email, password } = req.body

  // 1. validaciones de backed

  // .todos los campos debas estar completos
  if (username === "" || email === "" || password === "") {
    res.render("auth/signup-form.hbs", {
      errorMessage: "Todos los campos deben estar llenos"
    })
    return // return detiene la ejecución de la funcion
  } 


  // la contraseña debe tener ciertas caracteristicas
  // if (password.length < 3 || password.length > 10)

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
  // para probar regex tenemos .test()
  if (passwordRegex.test(password) === false) {
    res.render("auth/signup-form.hbs", {
      errorMessage: "La contraseña debe tener min: 8 chars, una mayuscula, una minuscula y un caracter especial"
    })
    return // return detiene la ejecución de la funcion
  }


  // ....???

  // 2. crear el perfil del usuario

  // solo si todo fue bien, entonces...
  res.redirect("/auth/login")

})

// GET "/auth/login" => renderizar el formulario de acceso
router.get("/login", (req, res, next) => {
  res.render("auth/login-form.hbs")
})

// POST "/auth/login" => recibir las credenciales del usuario y permitirle acceso (creamos una sesión activa)



module.exports = router;