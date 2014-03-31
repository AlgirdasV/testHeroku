var Parser = function() {

	this.parseObject = function(JSONstringified) {
		var head = JSONstringified.headers,
			obj = JSON.parse(JSONstringified.body.message);
		dataEye.emitter.emit('onParse', obj, head);
	};

	this.parseObjectOnly = function(JSONstringified) {
		var head = JSONstringified.headers,
			obj = JSON.parse(JSONstringified.body.message),
			visi = {};
			visi.head = head;
			visi.obj = obj;
			console.log('objektas', obj);
		return visi;
	};

};

module.exports = Parser;