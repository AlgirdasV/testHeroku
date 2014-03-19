// var app = require('../app');
var emitter = require('./emitter.js').eventEmitter;

var Parser = function() {

	this.parseObject = function(JSONstringified) {
		var obj = this.jsonParser(JSONstringified);
		emitter.emit('onParse', obj);
	};

	this.jsonParser = function(JSONstringified) {
		return JSON.parse(JSONstringified);
	};

};

module.exports = Parser;