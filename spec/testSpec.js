var request = require('request');

/*describe('validateObject function', function() {

it("should respond with hello world", function(done) {
request("http://localhost:3000/receiver", function(error, response, body) {
//console.log('pirmas', response);
done();
});
}, 250); // timeout after 250 ms

it('Server should respond to /', function(done) {
request.get('http://localhost:3000/receiver', function(response) {
expect(response.statusCode).toBe(200);
//console.log('antras', response);
done();
});
});
});*/
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

describe('Signup', function() {

	var url = 'http://localhost:3000/receiver';
	var params = null;

	beforeEach(function() {
		params = {
			url: url,
			form: {
				message: data2
			}
		}
	});

	it('returns a 200 OK on valid user signup', function() {
		return request.post(params, function(err, resp, body) {
			//console.log('response', resp);
			expect(resp.statusCode).toEqual(200);
		});
	});
});
