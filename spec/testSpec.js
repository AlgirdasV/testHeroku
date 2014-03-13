var app = require('../app.js'),
	http = require('support/http');

// Currently not needed
/*describe('User API', function() {

	before(function(done) {
		http.createServer(app, done);
	});

	it('POST /receiver should return 200', function(done) {
		request()
			.post('/receiver')
			.set('Content-Type', 'application/json')
			.write(JSON.stringify({
				username: 'test',
				password: 'pass'
			}))
			.expect(200, done);
	});
});*/

/*
var object = {
  userID: '33.23.33.3:Chrome',
  actions: [ {positionX: 12, positionY:145, eventType: 'click', elementID: 'form1', documentHeight: null,documentWidth: null,timeNow: Date.now()-1000},
   {positionX: 111, eventType: 'focus', positionY:222, elementID: 'form1', documentHeight: null,documentWidth: null, timeNow: Date.now()-10000},
   {positionX: -4, eventType: 'scroll', positionY: 10, elementID: null, documentHeight: null,documentWidth: null, timeNow: Date.now()-1000},
   {positionX: null, eventType: 'resize', positionY: null, elementID: null, documentHeight: 1453,documentWidth: 364, timeNow: Date.now()-100},
   {positionX: null, eventType: 'resize', positionY: null, elementID: null, documentHeight: 1453,documentWidth: 364, timeNow: Date.now()-1000}
   ]
};*/
/*var object2 = {
  "userID":"87.247.112.204:Chrome","actions":': { '{"synced":true,"timeNow":1394704593837,"eventType":"dblclick"
,"positionX":493,"positionY":1589,"elementId":"","documentHeight":null,"documentWidth":null},{"synced":true,"timeNow":13
94704596003,"eventType":"scroll","positionX":658,"positionY":0,"documentHeight":null,"documentWidth":null},{"synced":tru
e,"timeNow":1394704596007,"eventType":"click","positionX":505,"positionY":791,"elementId":"","documentHeight":null,"docu
mentWidth":null},{"synced":true,"timeNow":1394704596618,"eventType":"scroll","positionX":1458,"positionY":0,"documentHei
ght":null,"documentWidth":null},{"synced":true,"timeNow":1394704596837,"eventType":"click","positionX":434,"positionY":1
603,"elementId":"","documentHeight":null,"documentWidth":null},{"synced":true,"timeNow":1394704598181,"eventType":"click
","positionX":441,"positionY":1595,"elementId":"","documentHeight":null,"documentWidth":null}]: '' } 
};*/
/*var stringified = JSON.stringify(object);
parseris.parseObject(stringified);*/
//var Validator =  require('./routes/validator.js');
//var validatorius = new Validator();