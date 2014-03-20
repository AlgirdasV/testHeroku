var request = require('request');

var data = {
	userID: "1395268848909-623c167a-2e3f",
	actions: [{
		timeNow: 1395232178904,
		eventType: "resize",
		documentHeight: 643,
		documentWidth: 1351,
		elementId: null,
		positionX: null,
		positionY: null,
		url: null
	}, {
		timeNow: 1395232178906,
		eventType: "scroll",
		documentHeight: null,
		documentWidth: null,
		elementId: null,
		positionX: 664,
		positionY: 0,
		url: null
	}]
};
var data2 = JSON.stringify(data);

describe('Receiver function', function() {

	var url = 'http://localhost:3000/receiver';
	var params = null;

	beforeEach(function() {
		params = {
			url: url,
			form: {
				message: data2
			}
		};
	});

	it('returns a 200 OK on valid user signup', function() {
		return request.post(params, function(err, resp, body) {
			//console.log('response', resp);
			expect(resp.statusCode).toEqual(200);
			expect(resp.body.success).toEqual('success');
			console.log(resp.body);
		});
	});
});


describe('Register function', function() {

	var url = 'http://localhost:3000/register';
	var params = null;
	var temp1 = 'asd';

	beforeEach(function() {
		params = {
			url: url,
			form: {
				message: ''
			}
		};
	});

	it('Checks if register returns success', function() {
		return request.post(params, function(err, resp, body) {
			expect(resp.statusCode).toEqual(200);
			expect(resp.success).toEqual('success');
			temp1 = (JSON.parse(resp.body)).userId;
			console.log(resp.body);
		});
	});

	it('Checks if register returns unique id', function() {
		return request.post(params, function(err, resp, body) {
			expect(resp.success).toEqual('success');
			expect(temp1).not.toBe((JSON.parse(resp.body)).userId);
			console.log('previous id: ', temp1, 'current id: ', (JSON.parse(resp.body)).userId);
		});
	});
});
