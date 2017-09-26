const express = require('express');
const router = express.Router();
const transaction = require('../controllers/transaction')
const auth = require('../helpers/auth')

router.post('/', auth.isLogin, transaction.createTransaction)

module.exports = router
