/**

 *  Module dependencies.
 */
var EventEmitter = require('events').EventEmitter;
  eventEmitter = new EventEmitter(),
  Parser = require('./routes/parser.js'),
  parseris = new Parser(),
  Validator = require('./routes/validator.js'),
  validatorius = new Validator(),


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

//what does this thing do ?
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
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/receiver', function(req, res) {
  console.log("post received:");
  //FIX TODO check data and send response depending
  res.json(200, {
    "success": "success",
  });
  eventEmitter.emit('onReceive', req.body.message);
});

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

//event subscriberis TODO FIX iškelti į funcktions failą
(function() {
  eventEmitter.on('onReceive', function(info) {
    console.log('\nData received', info);
    parseris.parseObject(info);
  });
  eventEmitter.on('onParse', function(info) {
    console.log('\nData parsed');
    validatorius.validate(info);
  });
  eventEmitter.on('onValidateSuccess', function(info) {
    console.log('\nData validation succeed', info);
    // FIX validate if truly successful
    eventEmitter.emit('onRecordSuccess', info);
  });
  eventEmitter.on('onValidateFail', function(info) {
    console.log('\nData validation failed');
  });
  eventEmitter.on('onRecordSuccess', function(info) {
    console.log('\nData record succeed');
    fs.appendFile("./littleEyeLogs.txt", '\n'+JSON.stringify(info), function(err) {
      if (err) {
        eventEmitter.emit('onRecordFail', err);
      } else {
        console.log("The file was saved!");
      }
    });
  });
  eventEmitter.on('onRecordFail', function(info) {
    console.log('\nData record failed: ', info);
  });
})();