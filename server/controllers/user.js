const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

var getAllUsers = (req, res) => {
  User.find()
  .then(data => {
    res.send({
      msg: 'data found',
      data: data
    })
  })
  .catch(err => res.send(err))
}

var getUsersById = (req, res) => {
  User.findOne({
    _id: req.params.id
  })
  .then(data => {
    res.send({
      msg: 'data found',
      data: data
    })
  })
  .catch(err => res.send(err))
}


var deleteUser = (req, res) => {
  User.remove({
    _id: req.params.id
  })
  .then(data => {
    res.send({
      msg: 'data removed',
      data: data
    })
  })
  .catch(err => res.send(err))
}

var editUser = (req, res) => {
  User.update({
    _id: req.params.id
  },
  {
    name: req.body.name,
    username: req.body.name,
    email: req.body.email
  })
  .then(data => {
    res.send({
      msg: 'data updated',
      data: data
    })
  })
  .catch(err => res.send(err))
}

var signup = (req, res) => {
  var salt = bcrypt.genSaltSync(10)
  var hash = bcrypt.hashSync(req.body.password, salt)

  User.create({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: hash,
    role: 'member'
  })
  .then(data => {
    res.send({
      msg: 'data created',
      data: data
    })
  })
  .catch(err => res.send(err))
}

var signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
  .then(data => {
    if (data == null) {
      res.send({
        msg: 'username not found'
      })
    }
    else {
      if (bcrypt.compareSync(req.body.password, data.password)) {
        let token = jwt.sign({
          id: data._id,
          name: data.name,
          username: data.username,
          role: data.role
        }, process.env.JWT_SECRET)

        res.send({
          msg: 'login success',
          data: token
        })
      }
      else {
        res.send({
          msg: 'password incorrect'
        })
      }
    }
  })
  .catch(err => res.send(err))
}

var createUser = (req, res) => {
  var salt = bcrypt.genSaltSync(10)
  var hash = bcrypt.hashSync(req.body.password, salt)

  User.create({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: hash,
    role: req.body.role
  })
  .then(data => {
    res.send({
      msg: 'data created',
      data: data
    })
  })
  .catch(err => res.send(err))
}


module.exports = {
  getAllUsers,
  getUsersById,
  deleteUser,
  editUser,
  signup,
  signin,
  createUser
}
