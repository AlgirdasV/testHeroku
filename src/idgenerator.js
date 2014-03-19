var IdGenerator = function() {
	'use strict';

	this.getUniqueId = function() {
		var newUserId = this.generateId();
		if(this.isUnique(newUserId)) {
			return newUserId;
		}
	};

	this.generateId = function() {
		return Date.now() + '-' + this.randString() + this.randString() + '-' +
		this.randString();
		//app.eventEmitter.emit('onGenerated', obj);
	};

	this.randString = function() {
		return Math.floor((1 + Math.random()) * 0x10000)
             .toString(16)
             .substring(1);
	};

	this.isUnique = function() {
		// FIX TODO check in database
		return true;
	};

};

module.exports = IdGenerator;