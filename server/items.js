'use strict';
/* Using databases requires syncronous selections or special
 * SQL commands. It wasn't cool to make our simple flat model
 * work with complex SQL queries. The main problem is in relations
 * one-to-many. For example items can have many tags and comments.
 * It seems impossible to query one relation and fill all data with it.
 *
 * So for now we choose syncronously filling the data we want
 * to return using Promises.
 */

const Promise = require('bluebird');
const db = require('./database/');
const scripts = require('./database/selection');

/* Getting all items.
 */
const getItems = new Promise(function(resolve, reject) {
	db.query(scripts.allItems, (err, res) => {
		if (err) { reject(err); }
		resolve(res);
	});
});

/* Filling items with images.
 */
const getImages = (item) => {
	return new Promise(function(resolve, reject) {
		db.query(scripts.imagesOfItem, {item_id: item.id}, (err, rows) => {
			if (err) { reject(err); }
			// TODO add alt
			item.imageList = rows.map(img => ({url: img.url}));
			return resolve( item );
		});
	});
};

/* Filling items with tags.
 */
const getTags = (item) => {
	return new Promise(function(resolve, reject) {
		db.query(scripts.tagsOfItem, {item_id: item.id}, (err, rows) => {
			if (err) { reject(err); }
			item.tags = rows.map(tag => tag.name);
			return resolve( item );
		});
	});
};

/* Composing all fillers to construct item list.
 * getItems -> getImages -> getTags
 * Public interface.
 */
function getAllItems(callback) {
	if (typeof(callback) !== 'function') {
		console.log('getAllItems: expects a callback function as an arg');
		return;
	}
	getItems.then(items => {
		let result = [];
		Promise.map(items, (item) => {
			return getImages(item) // find images for each item
				.then(item => getTags(item)); // find tags for each item
		}).then(items => {
			callback(items);
		});
	}).catch( err => {console.log(err);}); // FIXME Log error the right way
}

module.exports.getAllItems = getAllItems;
