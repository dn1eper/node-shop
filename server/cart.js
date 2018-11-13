'use strict';
const db = require('./database/');
const scripts = require('./database/selection');

/* Public interface
 */
function createNewOrder(items, user_id, callback) {
    if (user_id === undefined) callback({status: 'Only registered users can place an order.'});
    else addNewOrder(user_id)
    .then(order_id => {
        items.forEach(item => {
            addNewOrderItem(order_id, item.id, item.count)
            .catch(err => {
                console.error(err);
                removeOrder(order_id);
                return {status: 'Server error, try again later'};
            });
        });
        return {status: 'success', order_id: order_id};
    })
    .then(result => {
        // TODO: fix - result send before new items added
        callback(result);
    })
    .catch(err => {
        console.error(err);
        callback({status: 'Server error, try again later'});
    }); // FIXME Log errors the right way
}


const addNewOrder = (user_id) => {
    return new Promise((resolve, reject) => {
		db.query(scripts.addNewOrder, {user_id: user_id}, (err, rows) => {
            if (err) { return reject(err); }
			return resolve(rows.info.insertId);
		});
	});
}

const addNewOrderItem = (order_id, item_id, count) => {
    return new Promise((resolve, reject) => {
		db.query(scripts.addNewOrderItem, {order_id: order_id, item_id: item_id, count: count}, (err, rows) => {
            if (err) { return reject(err); }
			return resolve(true);
		});
	});
}

const removeOrder = (order_id) => {
    return new Promise((resolve, reject) => {
		db.query(scripts.removeOrder, {order_id: order_id}, (err, rows) => {
            if (err) { return reject(err); }
			return resolve(true);
        });
        db.query(scripts.removeOrderItems, {order_id: order_id}, (err, rows) => {
            if (err) { return reject(err); }
			return resolve(true);
		});
	});
}

module.exports.createNewOrder = createNewOrder;
