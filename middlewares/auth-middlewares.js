const isLoggedIn = (req, res, next) => {
  if (req.session.activeUser === undefined) {
    res.redirect("/auth/login")
  } else {
    next() // next sin argumentos significa continua con las rutas
  }
}

// checkeo que el usuario sea de tipo admin
const isAdmin = (req, res, next) => {
  if (req.session.activeUser.role !== "admin") {
    res.redirect("/auth/login")
  } else {
    next() // next sin argumentos significa continua con las rutas
  }
}

// checkeo que el usuario sea de tipo user
const isUser = (req, res, next) => {
  if (req.session.activeUser.role === "user") {
    next() // next sin argumentos significa continua con las rutas
  } else {
    res.redirect("/auth/login")
  }
}

module.exports = {
  isLoggedIn: isLoggedIn,
  isAdmin: isAdmin
}

// module.exports = {
//   isLoggedIn,
//   isAdmin
// }