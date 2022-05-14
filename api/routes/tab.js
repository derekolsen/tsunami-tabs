var express = require('express');
var router = express.Router();
const TabController = require("../controllers/tab")


/* GET tab JSON. */

router.get('/:id', TabController.retrieveTab)

module.exports = router;
