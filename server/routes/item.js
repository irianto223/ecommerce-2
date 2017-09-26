var express = require('express');
var router = express.Router();
// const bodyParser = require('body-parser')
// router.use(bodyParser.json())
// router.use(bodyParser.urlencoded({
//   extended: true
// }))
const itemController = require('../controllers/item')

router.post('/', itemController.createItem)
router.get('/', itemController.getAllItems)
router.get('/:id', itemController.getItem)
router.delete('/:id', itemController.deleteItem)
router.put('/:id', itemController.updateItem)
router.put('/:id/stock', itemController.updateStock)

module.exports = router
