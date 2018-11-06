var express = require('express');
var router = express.Router();
var items = require('../items');

// Just fetching all posts
router.get('/', (req, res, next) => {
	items.getAllItems((items) => {
		res.json({items: items});
	});
});

module.exports = router;
