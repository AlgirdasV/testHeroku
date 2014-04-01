var Parser = function() {

	this.parseObject = function(JSONstringified) {
		var head = JSONstringified.headers,
			obj = JSON.parse(JSONstringified.body.message);
		dataEye.emitter.emit('onParse', head, obj);
	};

	this.parseObjectOnly = function(JSONstringified) {
		var head = JSONstringified.headers,
			obj = JSON.parse(JSONstringified.body.message),
			formedObj = {};
			formedObj.head = head;
			formedObj.obj = obj;
		return formedObj;
	};

};

module.exports = Parser;