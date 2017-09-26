const mongoose = require('mongoose')

var schema = mongoose.Schema({
  name: String,
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: String
},
{
  timestamps: true
})

var User = mongoose.model('users', schema)

module.exports = User
