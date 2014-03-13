var app = require('../app');

var Parser = function() {

	this.parseObject = function(JSONstringified) {
		var obj = this.jsonParser(JSONstringified);
		app.eventEmitter.emit('onParse', obj);
	};

	this.jsonParser = function(JSONstringified) {
		return JSON.parse(JSONstringified);
	};

};

module.exports = Parser;