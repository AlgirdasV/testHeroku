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
		var os = "Unknown",
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
        };
        M = M[2] ? [M[1], M[2]] : [head.userAgent, head.userAgent, "-?"];
        if ((tem = ua.match(/version\/([\.\d]+)/i)) !== null) {
            M[2] = tem[1];
        };
        browserName = M[0];
        browserFullName = M.join(" ");
		lang = head['accept-language'];     
        if (head['user-agent'].indexOf("Win")!=-1) os ="Windows"; 
        if (head['user-agent'].indexOf("Mac")!=-1) os ="MacOS";
        if (head['user-agent'].indexOf("X11")!=-1) os ="UNIX";
        if (head['user-agent'].indexOf("Linux")!=-1) os ="Linux";
		cookieId = this.getRealId() + '-' + browserFullName + '-' + os + '-' + body.w  + 'x' + body.h + '-' + lang + '-' + body.t ;
		console.log(cookieId);
	    cookieId = this.encode(cookieId);
		cookieId = this.randString()+ this.randString() +this.randString()+cookieId;

		return cookieId;
		app.eventEmitter.emit('onGenerated', obj);
	};

	this.encode = function (unencoded) {
		  return new Buffer(unencoded || '').toString('base64');
	};
		 
	this.decode = function (encoded) {
		encoded = encoded.substr(3);
		return new Buffer(encoded || '', 'base64').toString('utf8');
	};

	this.getRealId = function() {
		return 10;
	};

	//check if user id is valid and it is recorded to bd 
	this.check = function(id , reqh) {
		// FIX TODO check in database
		if(!bd.isValidCookie(data)){
			return false
		}
		return true;
	};

	this.randString = function() {
		return Math.floor((1 + Math.random()) * 0x10000)
             .toString(16)
             .substring(1);
	};

};

module.exports = IdGenerator;