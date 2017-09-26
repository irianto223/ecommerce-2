const mongoose = require('mongoose')

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  imageurl: String
},
{
  timestamps: true
})

const Item = mongoose.model('items', schema)

module.exports = Item
