var request = require('request'),
	Globals = require('../src/global/globals.js'),
	globals = new Globals(),
	dataEye = globals.init(),
	ValidatorHelper = require('./validatorHelper.js'),
	validatorHelper = new ValidatorHelper(),
	response;

validatorHelper.init();

var userDataToSend = JSON.stringify(validatorHelper.getPassingValidateObj()[0]);
//console.log(userDataToSend);

describe('Receiver function', function() {

	beforeEach(function() {
		params = {
			url: 'http://localhost:3000/receiver',
			form: {
				message: userDataToSend
			}
		};
		response = undefined;
	});

	it("Tests server connection", function() {
		spyOn(dataEye.emitter, 'emit');
		makeAjaxCall();
		waitsFor(function() {
			return (response !== undefined);
		}, "The Ajax call timed out.", 500);

		runs(function() {
			expect(response.statusCode).toEqual(200);
			expect(JSON.parse(response.body).success).toEqual('success');
		});
	});

});


describe('Register function', function() {

	var userId = '';

	beforeEach(function() {
		params = {
			url: 'http://localhost:3000/register',
			form: {
				message: userDataToSend
			}
		};
	});

	it('Checks if register returns success', function() {
		//spyOn(dataEye.emitter, 'emit');
		makeAjaxCall();
		waitsFor(function() {
			return (response !== undefined);
		}, "The Ajax call timed out.", 500);

		runs(function() {
			expect(response.statusCode).toEqual(200);
			expect(JSON.parse(response.body).success).toEqual('success');
			// FIX LOGIC HERE
			userId = (JSON.parse(response.body)).userId;
			//console.log('userId', userId);
			expect(userId).not.toBe(undefined);
		});
	});

	it('Checks if register returns unique id', function() {
		//spyOn(dataEye.emitter, 'emit');
		makeAjaxCall();
		waitsFor(function() {
			return (response !== undefined);
		}, "The Ajax call timed out.", 500);

		runs(function() {
			//expect(response.statusCode).toEqual(200);
			expect(JSON.parse(response.body).success).toEqual('success');
			// FIX LOGIC HERE
			userId = (JSON.parse(response.body)).userId;
			//console.log('userId', userId);
			expect(userId).not.toBe(undefined);
			expect(userId).not.toBe((JSON.parse(response.body)).userId);
		});
	});

});

function makeAjaxCall() {
	request.post(params, function(err, resp, body) {
		response = resp;
	});
}