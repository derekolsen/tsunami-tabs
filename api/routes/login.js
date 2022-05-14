var express = require('express');
var router = express.Router();
const LoginController = require("../controllers/login")


/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

/* POST login */
router.post('/', LoginController.handleLogin);

module.exports = router;
