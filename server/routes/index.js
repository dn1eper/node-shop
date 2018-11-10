var express = require('express');
var router = express.Router();

var items = require('../items');
var auth = require('../auth');

// Just fetching all posts
router.get('/', (req, res, next) => {
	items.getAllItems((items) => {
		res.json({items: items});
	});
});

// Trying to authenticate
router.post('/authenticate', (req, res, next) => {
	auth.authenticate(req.body.login, req.body.pass, user_id => {
		if (user_id) {
			var token = auth.generateToken(user_id);
			return res.json({token: token}); 
		}
		else { return res.json({token: false}); }
	});
});

// Reauthenticate if token time has expired
router.post('/reauthenticate', (req, res, next) => 
	auth.reGenerateToken(req.body.token, newToken =>
		res.json({token: newToken}))
);

// Logout
router.post('/logout', (req, res, next) => {
	auth.deleteToken(req.body.token);
	res.json({status: 'success'});
});

// Trying to register new user
router.post('/register', (req, res, next) => 
	auth.register(req.body.login, req.body.pass, result => 
		res.json(result)
	)
);

module.exports = router;
