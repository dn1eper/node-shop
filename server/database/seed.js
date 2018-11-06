const utils = require('../utils');
const data = require('./seed.json');
const db = require("./index.js")
const deasync = require('deasync');

let inserts = [
	['INSERT INTO admin (login, pass_hash) VALUES (?, ?)', 'admin', utils.hash('password')],
	['INSERT INTO admin (login, pass_hash) VALUES (?, ?)', 'ian', utils.hash('admin')]
];

function seed() {
	data.items.forEach(({id, title, htmlText, price, images, tags}) => {
		inserts.push(['INSERT INTO item (item_id, title, htmlText, price) VALUES (?, ?, ?, ?)', id, title, htmlText, price]);
		images.forEach((url) => 
			inserts.push(['INSERT INTO item_image (url, item_id) VALUES (?, ?)', url, id])
		);
		tags.forEach((tag) => 
			inserts.push(['INSERT INTO item_tag (name, item_id) VALUES (?, ?)', tag, id])
		);
	});
	
	var connected = false;
	var ended = false;
	var attempts = 10;
	inserts.forEach((item, index) => {
		db.query(item[0], item.slice(1), (err) => {
			if (err) throw new Error(err);
			console.log((index+1) + ' row inserted');
			connected = true;
			if (index == inserts.length-1) ended = true;
		});
	});

	while(!ended) {
		if (!connected && 0 >-- attempts) {
			throw new Error("Database not responding");
		}
		deasync.sleep(100);
	}
}


if (module.parent === null) {
    seed();
    db.end();
    process.exit();
}
