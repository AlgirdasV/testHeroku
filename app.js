var Globals = require('./src/global/globals.js'),
	globals = new Globals(),
	dataEye = globals.init();
/**
 *  Module dependencies.
 */
var allowCrossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
	if ('OPTIONS' == req.method) {
		res.send(200);
	} else {
		next();
	}
};

var express = require('express'),
	cors = require('cors'),
	routes = require('./routes'),
	http = require('http'),
	path = require('path'),
	app = express();


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

app.get('/', routes.index);
app.post('/receiver', function(req, res) {
	//console.log("post received:", req.body.message);
	//FIX TODO check data and send response depending
	res.json(200, {
		"success": "success"
	});
	//req.body.message.head = req.headers;
	dataEye.emitter.emit('onReceive', req);
});

app.post('/register', function(req, res) {
	console.log("post received:");
	//FIX TODO get unique Id for user
	//eventEmitter.emit('onRegister', req.body.message);
	//response shpuld after successfully registered event
	res.json(200, {
		'success': 'success',
		'userId': idGenerator.getUniqueId(req)
	});
});

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});