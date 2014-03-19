/**
 *  Module dependencies.
 */
var EventEmitter = require('events').EventEmitter;
eventEmitter = new EventEmitter(),
Parser = require('./src/parser.js'),
parser = new Parser(),
Validator = require('./src/validator.js'),
validator = new Validator(),
Listener = require('./src/lisener.js'),
listener = new Listener(),
allowCrossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
	if ('OPTIONS' == req.method) {
		res.send(200);
	} else {
		next();
	}
},

fs = require('fs'),
express = require('express'),
cors = require('cors'),
routes = require('./routes'),
http = require('http'),
path = require('path'),
app = express();

exports.eventEmitter = eventEmitter;
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(allowCrossDomain);
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	next();
});
// development only
if ('development' === app.get('env')) {
	app.use(express.errorHandler());
}

listener.init();
app.get('/', routes.index);
app.post('/receiver', function(req, res) {
	console.log("post received:");
	//FIX TODO check data and send response depending
	res.json(200, {
		"success": "success"
	});
	eventEmitter.emit('onReceive', req.body.message);
});

app.post('/register', function(req, res) {
	console.log("post received:");
	//FIX TODO get unique Id for user
	//eventEmitter.emit('onRegister', req.body.message);
	//response shpuld after successfully registered event
	res.json(200, {
		"success": "success",
		"userId": "33.23.33.3"
	});
});

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});