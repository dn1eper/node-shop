const mariasql = require('mariasql');
const config = require('../config');

module.exports = new mariasql({
	host: config.get("database:host"),
	user: config.get("SHOP_USER"),
	password: config.get("SHOP_PASSWORD"),
	db: config.get("SHOP_DB")
});