/**
 *  Module dependencies.
 */
//var events = require('events');
//var eventEmitter = new events.EventEmitter();
var EventEmitter = require('events').EventEmitter;
var eventEmitter = new EventEmitter();
exports.eventEmitter = eventEmitter;
//event subscriberis TODO FIX iškelti į funcktions failą
(function(){
    console.log(5);
        eventEmitter.on('onReceive', function (info) {
          console.log('Data received', info );
          parseris.parseObject(info);
        });
        eventEmitter.on('onParse', function (info) {
          console.log('Data parsed');
          validatorius.validate(info);
        });
        eventEmitter.on('onValidateSuccess', function (stream) {
          
          console.log('data validation succeed');
        });
        eventEmitter.on('onValidateFail', function (stream) {
          
          console.log('data validation failed');
        });
        eventEmitter.on('onRecordSucces', function (stream) {
          
          console.log('Data record succeed');
        });
        eventEmitter.on('onRecordFail', function (stream) {
          
          console.log('Data record failed');
        });

})();

var Parser =  require('./routes/parser.js');
var Validator =  require('./routes/validator.js');
var parseris = new Parser();
var validatorius = new Validator();
var object = {
  userID: '33.23.33.3:Chrome',
  // userID: '',
  actions: [ {positionX: 12, positionY:145, eventType: 'click', elementID: 'form1', documentHeight: null,documentWidth: null,timeNow: Date.now()-1000},
   {positionX: 111, eventType: 'focus', positionY:222, elementID: 'form1', documentHeight: null,documentWidth: null, timeNow: Date.now()-10000},
   {positionX: -4, eventType: 'scroll', positionY: 10, elementID: null, documentHeight: null,documentWidth: null, timeNow: Date.now()-1000},
   {positionX: null, eventType: 'resize', positionY: null, elementID: null, documentHeight: 1453,documentWidth: 364, timeNow: Date.now()-100},
   {positionX: null, eventType: 'resize', positionY: null, elementID: null, documentHeight: 1453,documentWidth: 364, timeNow: Date.now()-1000}
   ]
};
var stringified = JSON.stringify(object);
parseris.parseObject(stringified);
//var Validator =  require('./routes/validator.js');
//var validatorius = new Validator();
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
var express = require('express');
var cors = require('cors')
var routes = require('./routes');
var user = require('./routes/user')
var http = require('http');
var path = require('path'); 

var app = express();

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
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/helloworld', routes.helloworld);
//čia gyvena receveris
app.post('/receiver', function(req, res) {
    console.log("post received:");
	//FIX TODO iniate further work with data
	res.json(200, {"success": "success"});
    eventEmitter.emit('onReceive', req.body); 
});

http.createServer(app).listen(app.get('port'), function(){
    //console.log("liseneris pradeda darbą");
    console.log('Express server listening on port ' + app.get('port'));

});
