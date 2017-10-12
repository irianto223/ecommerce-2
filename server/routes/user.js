const express = require('express')
const router = express.Router()
const user = require('../controllers/user')
const auth = require('../helpers/auth')

router.get('/', auth.isLogin, auth.isAdmin, user.getAllUsers)
router.get('/:id', auth.isLogin, auth.isOwner, user.getUsersById)
// router.post('/', user.createUser)
router.post('/', auth.isLogin, auth.isAdmin, user.createUser)
router.delete('/:id', auth.isLogin, auth.isAdmin, user.deleteUser)
router.put('/:id', auth.isLogin, auth.isOwner, user.editUser)

module.exports = router
