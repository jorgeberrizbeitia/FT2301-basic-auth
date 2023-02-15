const express = require("express");
const router = express.Router();

const User = require("../models/User.model.js");
const bcrypt = require("bcryptjs");

// GET "/auth/signup" => renderizar el formulario de registro
router.get("/signup", (req, res, next) => {
  res.render("auth/signup-form.hbs");
});

// POST "/auth/signup" => recibir la info del formulario y crear el perfil de usuario
router.post("/signup", async (req, res, next) => {
  console.log(req.body);
  const { username, email, password } = req.body;

  // 1. validaciones de backed

  // .todos los campos debas estar completos
  if (username === "" || email === "" || password === "") {
    res.status(401).render("auth/signup-form.hbs", {
      errorMessage: "Todos los campos deben estar llenos",
    });
    // .todas las clausulas de guardia deberian tener un status de tipo 400 que acompañe.
    return; // return detiene la ejecución de la funcion
  }

  // la contraseña debe tener ciertas caracteristicas
  // if (password.length < 3 || password.length > 10)

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  // para probar regex tenemos .test()
  if (passwordRegex.test(password) === false) {
    res.render("auth/signup-form.hbs", {
      errorMessage:
        "La contraseña debe tener min: 8 chars, una mayuscula, una minuscula y un caracter especial",
    });
    return; // return detiene la ejecución de la funcion
  }

  try {
    // que no exista un usuario con este username/email
    // vamos a la DB y buscamos un usuario con ese username / email
    const foundUser = await User.findOne({ username: username });
    // foundUser si existe será el documento, si no existe será null
    console.log(foundUser);
    if (foundUser !== null) {
      res.render("auth/signup-form.hbs", {
        errorMessage: "Nombre de usuario ya existe",
      });
      return; // return detiene la ejecución de la funcion
    }

    const foundUserEmail = await User.findOne({ email: email });
    // foundUserEmail si existe será el documento, si no existe será null
    console.log(foundUserEmail);
    if (foundUserEmail !== null) {
      res.render("auth/signup-form.hbs", {
        errorMessage: "Correo electronico ya existe",
      });
      return; // return detiene la ejecución de la funcion
    }

    // Encriptar la contraseña como buenos desarrolladores que somos
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    // 2. crear el perfil del usuario
    await User.create({
      username: username,
      email: email,
      password: hashPassword,
    });

    // solo si todo fue bien, entonces...
    res.redirect("/auth/login");
  } catch (err) {
    next(err);
  }
});

// GET "/auth/login" => renderizar el formulario de acceso
router.get("/login", (req, res, next) => {
  res.render("auth/login-form.hbs");
});

// POST "/auth/login" => recibir las credenciales del usuario y permitirle acceso (creamos una sesión activa)
router.post("/login", async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;

  // validaciones
  // .todos los campos debas estar completos
  if (email === "" || password === "") {
    res.render("auth/login-form.hbs", {
      errorMessage: "Todos los campos deben estar llenos",
    });
    return; // return detiene la ejecución de la funcion
  }

  try {
    // el usuario está creado en la DB
    const foundUser = await User.findOne({email: email})
    if (foundUser === null) {
      res.render("auth/login-form.hbs", {
        errorMessage: "Usuario no registrado con ese correo electronico",
      });
      return; // return detiene la ejecución de la funcion
    }

    // verificar contraseña
    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password)
    console.log("isPasswordCorrect", isPasswordCorrect)
    if (isPasswordCorrect === false) {
      res.render("auth/login-form.hbs", {
        errorMessage: "Usuario con contraseña incorrecta",
      });
      return; // return detiene la ejecución de la funcion
    }


    // activar una sesión 
    // continuamente verificar si el usuario tiene una sesión
    req.session.activeUser = foundUser; // crea la sesión en la BD y envía la cookie (copia de sesión encriptada) al usuario
    // automaticamente, en TODAS las rutas vamos a tener accedo a req.session.activeUser => siempre nos dará el usuario que hace la llamada

    req.session.save(() => {
      // espera a que se haya creado la sesión en la DB correctamente y luego...
      // si todo esta correcto, entonces...
      // permitirle al usuario acceder a la pagina
    
      // por ahora una prueba
      res.redirect("/profile");
    })

  } catch(err) {
    next(err)
  }

});

// GET "/auth/logout" => cerrar/destruir la sesión del usuario
router.get("/logout", (req, res, next) => {

  req.session.destroy(() => {
    res.redirect("/")
  })

})

module.exports = router;
