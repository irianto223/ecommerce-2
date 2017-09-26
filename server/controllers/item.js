const Item =  require('../models/item')
require('dotenv').config()

var createItem = (req, res) => {
  Item.create({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    price: req.body.price,
    stock: req.body.stock,
    imageurl: req.body.imageurl
  })
  .then(data => {
    res.send({
      msg: 'data created',
      data: data
    })
  })
  .catch(err => res.send(err)) 
}

var getAllItems = (req, res) => {
  Item.find()
  .then(data => {
    res.send({
      msg: 'data found',
      data: data
    })
  })
  .catch(err => res.send(err))
}

var getItem = (req, res) => {
  Item.findOne({
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

var deleteItem = (req, res) => {
  Item.remove({
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

var updateItem = (req, res) => {
  Item.update({
    _id: req.params.id
  },
  {
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock
  })
  .then(data => {
    res.send({
      msg: 'data updated',
      data: data
    })
  })
  .catch(err => res.send(err))
}

var updateStock = (req, res) => {
  Item.update({
    _id: req.params.id
  },
  {
    stock: req.body.stock
  })
  .then(data => {
    res.send({
      msg: 'data updated',
      data: data
    })
  })
  .catch(err => re.send(err))
}

module.exports = {
  createItem,
  getAllItems,
  getItem,
  deleteItem,
  updateItem,
  updateStock
}
