// var app = require('../app');
var emitter = require('./emitter.js').eventEmitter;

var Parser = function() {

	this.parseObject = function(JSONstringified) {
		var head = JSONstringified.headers,
			obj = JSON.parse(JSONstringified.body.message);
		emitter.emit('onParse', obj, head);
	};

};

module.exports = Parser;