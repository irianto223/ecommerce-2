var express = require('express');
var router = express.Router();
var user = require('../controllers/user')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signup', user.signup)
router.post('/signin', user.signin)

module.exports = router;
