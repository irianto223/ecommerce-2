const Transaction =  require('../models/transaction')
const jwt = require('jsonwebtoken')
require('dotenv').config()

var createTransaction = (req, res) => {
  let decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET)
  Transaction.create({
    user: decoded.id,
    items: req.body.items
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
  createTransaction
}
