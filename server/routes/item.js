const express = require('express');
const router = express.Router();
const item = require('../controllers/item')
const auth = require('../helpers/auth')

router.post('/', auth.isLogin, auth.isAdmin, item.createItem)
router.get('/', item.getAllItems)
router.get('/:id', item.getItem)
router.delete('/:id', auth.isLogin, auth.isAdmin, item.deleteItem)
router.put('/:id', auth.isLogin, auth.isAdmin, item.updateItem)
router.put('/:id/stock', auth.isLogin, item.updateStock)

module.exports = router
