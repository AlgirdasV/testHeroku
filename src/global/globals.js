var Globals = function() {
	dataEye = {};

	this.init = function() {
		dataEye.EventEmitter = require('events').EventEmitter; //////////////////////////////
		dataEye.emitter = new dataEye.EventEmitter();
		dataEye.Listener = require('../lisener.js');
		dataEye.listener = new dataEye.Listener();
		dataEye.IdGenerator = require('../idgenerator.js');
		dataEye.idGenerator = new dataEye.IdGenerator();
		dataEye.ParserModule = require('../parser.js');
		dataEye.parser = new dataEye.ParserModule();
		dataEye.ValidatorModule = require('../validator.js');
		dataEye.validator = new dataEye.ValidatorModule();
		dataEye.inspector = require('schema-inspector');
		dataEye._ = require('underscore')._;
		dataEye.Schemas = require('../schemas.js');
		dataEye.schemas = new dataEye.Schemas();
		dataEye.listener.init();
		return dataEye;
	};

};

module.exports = Globals;