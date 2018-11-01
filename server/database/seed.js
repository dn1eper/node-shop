const utils = require('../utils');
const seed = require('./seed.json');
const db = require("./index.js")

let inserts = [
	['INSERT INTO admin (login, pass_hash) VALUES (?, ?)', 'admin', utils.hash('password')],
	['INSERT INTO admin (login, pass_hash) VALUES (?, ?)', 'ian', utils.hash('admin')]
];

seed.items.forEach(({id, title, htmlText, price, images, tags}) => {
	inserts.push(['INSERT INTO item (item_id, title, htmlText, price) VALUES (?, ?, ?, ?)', id, title, htmlText, price]);
	images.forEach((url) => 
		inserts.push(['INSERT INTO item_image (url, item_id) VALUES (?, ?)', url, id])
	);
	tags.forEach((tag) => 
		inserts.push(['INSERT INTO item_tag (name, item_id) VALUES (?, ?)', tag, id])
	);
});

inserts.forEach(function(item, index) {
	db.query(item[0], item.slice(1), function(err) {
		if (err) {
			db.end();
			console.dir(item);
			throw err;
		}
		console.log(index + 'rows inserted');
	});
});

db.end();
