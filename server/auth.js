'use strict';
const utils = require('./utils');
const db = require('./database/');
const scripts = require('./database/selection');

/* This only checks if a user is in database
 * and his password hash equals given one.
 */
const tryToAuthenticate = (login, pass_hash) => {
	return new Promise((resolve, reject) => {
		db.query(scripts.getPassHash, {login: login}, (err, rows) => {
			if (err) { return reject(err); }
			if (rows.length == 0) { return resolve(false); }
			if (rows[0].pass_hash != pass_hash) { return resolve(false); }
			return resolve(rows[0].admin_id);
		});
	});
};

/* This only checks if a user isn't in database
 */
const tryToRegister = (login) => {
	return new Promise((resolve, reject) => {
		db.query(scripts.getPassHash, {login: login}, (err, rows) => {
			if (err) { return reject(err); }
			if (rows.length == 0) { return resolve(true); }
			return resolve(false);
		});
	});
};

/* Insert new user in the database
 */
const registerNewUser = (login, pass_hash) => {
	return new Promise((resolve, reject) => {
		db.query(scripts.addNewUser, {login: login, pass_hash: pass_hash}, (err, rows) => {
			if (err) { return reject(err); }
			return resolve(true);
		});
	});
};

/* Public interface to authenticate users.
 */
function authenticate(login, pass, callback) {
	let pass_hash = utils.hash(pass);
	return tryToAuthenticate(login, pass_hash)
		.then(result => callback(result))
		.catch(err => console.error(err)); // FIXME Log errors the right way
}

/* Public interface to register users.
 */
function register(login, pass, callback) {
	let pass_hash = utils.hash(pass);
	return tryToRegister(login)
		.then(result => {
			if (!result) { callback({status: "A user with such login is already registered"}); }
			else {
				registerNewUser(login, pass_hash)
				.then(result => {
					if (!result)  { callback({status: "An error occurred while writing a new user to the database"}); }
					else { callback({status: 'success'}); }
				})
			}
		})
		.catch(err => console.error(err)); // FIXME Log errors the right way
}


const tokenQueue = []; // the list of tokens available

/* Generating a unique token and adding it to the tokenQueue
 * Public interface.
 */
function generateToken(user_id) {
	let token = utils.hash(Date.now().toString());
	tokenQueue[user_id] = {token: token, valid: true};
	setTimeout(() => {
		// Valid -> false after 10 min
		tokenQueue[user_id].valid = false;
	}, 600000);
	return token;
};

/* Get new token if time has expired
 * Public interface.
 */
function reGenerateToken(oldToken, callback) {
	let user_id = getUserId(oldToken);
	if (user_id !== -1) {
		let newToken = utils.hash(Date.now().toString());
		tokenQueue[user_id].token = newToken;
		tokenQueue[user_id].valid = true;
		callback(newToken);
	}
	else callback(false);
}

/* Check if the token is in there.
 * Public interface.
 */
function checkToken(token) {
	return tokenQueue.some(element => 
		element.valid === true && element.token === token
	);
}

/* Delete token if user logout
 * Public interface.
 */
function deleteToken(token) {
	tokenQueue.filter(element => element.token !== token);
}

/* Get user_id by token
 * Public interface.
 */
function getUserId(token) {
	return tokenQueue.map(element => element.token).indexOf(token);;
}

module.exports.authenticate = authenticate;
module.exports.checkToken = checkToken;
module.exports.generateToken = generateToken;
module.exports.register = register;
module.exports.reGenerateToken = reGenerateToken;
module.exports.deleteToken = deleteToken;
module.exports.getUserId = getUserId;
