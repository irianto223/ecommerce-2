const jwt = require('jsonwebtoken')

var isLogin = (req, res, next) => {
  if (req.headers.token == null) {
    res.send({
      msg: 'belum login'
    })
  }
  else {
    next()
  }
}

var isAdmin = (req, res, next) => {
  jwt.verify(req.headers.token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.send(err)
    }
    else {
      if (decoded.role != 'admin') {
        res.send({
          msg: 'bukan admin'
        })
      }
      else {
        next()
      }
    }
  })
}

var isOwner = (req, res, next) => {
  jwt.verify(req.headers.token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.send(err)
    }
    else {
      console.log(decoded.id);
      console.log(req.params.id);
      if (decoded.id == req.params.id || decoded.role == 'admin') {
        next()
      }
      else {
        res.send({
          msg: 'bukan owner'
        })
      }
    }
  })
}

module.exports = {
  isLogin,
  isAdmin,
  isOwner
}
