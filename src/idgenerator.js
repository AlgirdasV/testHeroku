/*var Globals = require('./src/global/globals.js'),
	globals = new Globals(),
	dataEye = globals.dataEye;*/
var IdGenerator = function() {
	'use strict';
	var base64 = exports;

	this.getUniqueId = function(req) {
		var head = req.headers,
			body = req.body,
			cookieId = this.generateId(head, body);
		return cookieId;
	};

	this.generateId = function(head, body) {
		var os,
			cookieId,
			browserName,
			browserFullName,
			lang,
			ua = head['user-agent'],
			tem,
			M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*([\d\.]+)/i) || [];
		if (/trident/i.test(M[1])) {
			tem = /\brv[ :]+(\d+(\.\d+)?)/g.exec(ua) || [];
			browserName = "IE";
			browserFullName = "IE " + (tem[1] || "");
		}

		M = M[2] ? [M[1], M[2]] : [head.userAgent, head.userAgent, "-?"];
		if ((tem = ua.match(/version\/([\.\d]+)/i)) !== null) {
			M[2] = tem[1];
		}

		browserName = M[0];
		browserFullName = M.join(" ");
		os = this.genOs(head['user-agent']);
		lang = head['accept-language'];

		cookieId = this.getRealId() + '_' + browserFullName + '_' + os + '_' + body.w + 'x' + body.h + '_' + lang + '_' + body.t;
		cookieId = this.encode(cookieId);
		cookieId = this.randChar() + this.randChar() + cookieId;

		dataEye.eventEmitter.emit('onGenerated', obj);
		return cookieId;/////////?
	};

	this.encode = function(unencoded) {
		return new Buffer(unencoded || '').toString('base64');
	};

	this.decode = function(encoded) {
		encoded = encoded.substr(2);
		return new Buffer(encoded || '', 'base64').toString('utf8');
	};

	this.getRealId = function() {
		return 10;
	};

	//check if user id is valid and it is recorded to bd 
	this.check = function(id) {
		// FIX TODO check in database
		/*if(!bd.isValidCookie(data)){
		return false
	}*/
		return true;
	};

	this.randChar = function() {
		var chars = "0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ";
		return chars.substr(Math.floor(Math.random() * 62), 1);
	};


	this.genOs = function(head) {
		var os = "Unknown";
		if (head.indexOf("Win") != -1) {
			os = "Windows";
		}
		if (head.indexOf("Mac") != -1) {
			os = "MacOS";
		}
		if (head.indexOf("X11") != -1) {
			os = "UNIX";
		}
		if (head.indexOf("Linux") != -1) {
			os = "Linux";
		}
		return os;
	};

};

module.exports = IdGenerator;