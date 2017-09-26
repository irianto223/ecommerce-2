const mongoose = require('mongoose')

var schema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'items',
    required: true
  }]
},
{
  timestamps: true
})

var Transaction = mongoose.model('transactions', schema)

module.exports = Transaction
