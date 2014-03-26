var Parser = function() {

	this.parseObject = function(JSONstringified) {
		var head = JSONstringified.headers,
			obj = JSON.parse(JSONstringified.body.message);
		dataEye.emitter.emit('onParse', obj, head);
	};

};

module.exports = Parser;