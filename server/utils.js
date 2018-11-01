'use strict';
const crypto = require('crypto');

function hash(str) {
	return crypto.createHash('sha256').update(str, 'utf8').digest('hex');
};

module.exports.hash = hash;

