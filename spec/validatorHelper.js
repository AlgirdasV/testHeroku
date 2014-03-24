var validatorHelper = function() {
	var validateObjectToPass,
		validateObjectToFail,
		mockUp,
		action,
		eventType = [];

	var resetMockUp = function() {
		mockUp = {};
		action = {
			"timeNow": null,
			"eventType": null,
			"documentHeight": null,
			"documentWidth": null,
			"elementId": null,
			"positionX": null,
			"positionY": null,
			"url": null
		};
		mockUp.userID = '';
		mockUp.actions = [];
	};

	this.init = function() {
		setValidObjects();
		setNotValidObjects();
	};

	this.getPassingValidateObj = function() {
		return validateObjectToPass;
	};

	this.getFailingValidateObj = function() {
		return validateObjectToFail;
	};

	// THESE SHOULD PASS
	var setValidObjects = function() {
		resetMockUp();
		validateObjectToPass = [];

		mockUp.userID = '1395668085709-5613b5c9-85b9';
		validateObjectToPass.push(mockUp);

		resetMockUp();
		mockUp.userID = '1395668099999-61234ca5-99ac';
		validateObjectToPass.push(mockUp);

		resetMockUp();
		mockUp.userID = '1395654621231-16asd161-2ca6';
		validateObjectToPass.push(mockUp);

		resetMockUp();
		mockUp.userID = '1395668074156-1a61654c-1z6x';
		validateObjectToPass.push(mockUp);

		resetMockUp();
		mockUp.userID = '1395668156511-6a4g6541-615v';
		validateObjectToPass.push(mockUp);

		resetMockUp();
		mockUp.userID = '1395668615658-56a461cx-5z4f';
		validateObjectToPass.push(mockUp);

		resetMockUp();
		mockUp.userID = '1395668061575-65a4f16c-76c2';
		validateObjectToPass.push(mockUp);

		resetMockUp();
		mockUp.userID = '1395668081891-561a651c-056c';
		validateObjectToPass.push(mockUp);

		resetMockUp();
		mockUp.userID = '1395615614511-0651c461-1562';
		validateObjectToPass.push(mockUp);

		resetMockUp();
		mockUp.userID = '1395668085709-15615611-85b9';
		validateObjectToPass.push(mockUp);
	};

	// THESE SHOULD FAIL
	var setNotValidObjects = function() {
		resetMockUp();
		validateObjectToFail = [];
		mockUp.userID = '33.2333.33.3:Chrome';
		validateObjectToFail.push(mockUp);

		resetMockUp();
		mockUp.userID = '22.2333.33.3:Chrome';
		validateObjectToFail.push(mockUp);

		resetMockUp();
		mockUp.userID = '11.2333.33.3:Chrome';
		validateObjectToFail.push(mockUp);

		resetMockUp();
		mockUp.userID = '44.2333.33.3:Chrome';
		validateObjectToFail.push(mockUp);

		resetMockUp();
		mockUp.userID = '55.2333.33.3:Chrome';
		validateObjectToFail.push(mockUp);

		resetMockUp();
		mockUp.userID = '66.2333.33.3:Chrome';
		validateObjectToFail.push(mockUp);

		resetMockUp();
		validateObjectToFail.push(mockUp);

		validateObjectToFail.push(null);

		validateObjectToFail.push('');

		validateObjectToFail.push('aaaa');
	};

};

module.exports = validatorHelper;