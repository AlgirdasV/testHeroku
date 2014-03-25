var validatorHelper = function() {
	var validateObjectToPass,
		validateObjectToFail,
		mockUp,
		action,
		eventType = ['click', 'dblclick', 'focus', 'dragstart', 'drop', 'scroll', 'change', 'resize', 'startscreen'];
	// click		: timeNow, eventType, NULL, NULL, elementId, positionX, positionY, url
	// dblclick		: timeNow, eventType, NULL, NULL, elementId, positionX, positionY, NULL
	// focus		: timeNow, eventType, NULL, NULL, elementId, positionX, positionY, NULL
	// dragstart	: timeNow, eventType, NULL, NULL, elementId, positionX, positionY, NULL
	// drop			: timeNow, eventType, NULL, NULL, elementId, positionX, positionY, NULL
	// scroll		: timeNow, eventType, NULL, NULL, NULL, positionX, positionY, NULL
	// change		: timeNow, eventType, NULL, NULL, elementId, NULL, NULL, NULL
	// resize		: timeNow, eventType, DW, DH, NULL, NULL, NULL, NULL
	// startscreen	: timeNow, eventType, DW, DH, NULL, NULL, NULL, url

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

	// VALID ACTION GENERATOR
	var setValidAction = function(time, type, dH, dW, eId, posX, posY, url) {
		action.timeNow = time;
		action.eventType = type;
		action.documentHeight = dH;
		action.documentWidth = dW;
		action.elementId = eId;
		action.positionX = posX;
		action.positionY = posY;
		action.url = url;
		return action;
	};

	// THESE SHOULD PASS
	var setValidObjects = function() {
		resetMockUp();
		validateObjectToPass = [];

		mockUp.userID = '1395668085709-5613b5c9-85b9';
		mockUp.actions.push(setValidAction(Date.now(), eventType[0], null, null, 'elementId', 100, 100, 'www.someUrl.com'));
		validateObjectToPass.push(mockUp);

		resetMockUp();
		mockUp.userID = '1395668099999-61234ca5-99ac';
		mockUp.actions.push(setValidAction(Date.now(), eventType[1], null, null, 'elementId', 100, 100, null));
		validateObjectToPass.push(mockUp);

		resetMockUp();
		mockUp.userID = '1395654621231-16asd161-2ca6';
		mockUp.actions.push(setValidAction(Date.now(), eventType[2], null, null, 'elementId', 100, 100, null));
		validateObjectToPass.push(mockUp);

		resetMockUp();
		mockUp.userID = '1395668074156-1a61654c-1z6x';
		mockUp.actions.push(setValidAction(Date.now(), eventType[3], null, null, 'elementId', 100, 100, null));
		validateObjectToPass.push(mockUp);

		resetMockUp();
		mockUp.userID = '1395668156511-6a4g6541-615v';
		mockUp.actions.push(setValidAction(Date.now(), eventType[4], null, null, 'elementId', 100, 100, null));
		validateObjectToPass.push(mockUp);

		resetMockUp();
		mockUp.userID = '1395668615658-56a461cx-5z4f';
		mockUp.actions.push(setValidAction(Date.now(), eventType[5], null, null, null, 100, 100, null));
		validateObjectToPass.push(mockUp);

		resetMockUp();
		mockUp.userID = '1395668061575-65a4f16c-76c2';
		mockUp.actions.push(setValidAction(Date.now(), eventType[6], null, null, 'elementId', null, null, null));
		validateObjectToPass.push(mockUp);

		resetMockUp();
		mockUp.userID = '1395668081891-561a651c-056c';
		mockUp.actions.push(setValidAction(Date.now(), eventType[7], 100, 100, null, null, null, null));
		validateObjectToPass.push(mockUp);

		resetMockUp();
		mockUp.userID = '1395615614511-0651c461-1562';
		mockUp.actions.push(setValidAction(Date.now(), eventType[8], 100, 100, null, null, null, 'www.someUrl.com'));
		validateObjectToPass.push(mockUp);

		resetMockUp();
		mockUp.userID = '1395668085709-15615611-85b9';
		mockUp.actions.push(setValidAction(Date.now(), eventType[0], null, null, 'elementId', 100, 100, 'www.someUrl.com'));
		validateObjectToPass.push(mockUp);
	};

	// THESE SHOULD FAIL
	var setNotValidObjects = function() {
		resetMockUp();
		validateObjectToFail = [];
		mockUp.userID = '1395668085709-15615611-85b9';
		mockUp.actions.push(setValidAction(Date.now(), eventType[0], -100, -100, 'elementId', 100, 100, 'www.someUrl.com'));
		validateObjectToFail.push(mockUp);

		resetMockUp();
		mockUp.userID = '1395668085709-15615611-85b9';
		mockUp.actions.push(setValidAction(Date.now(), eventType[0], 100, 100, 'elementId', 100, 100, null));
		validateObjectToFail.push(mockUp);

		resetMockUp();
		mockUp.userID = '1395668085709-15615611-85b9';
		mockUp.actions.push(setValidAction(Date.now(), eventType[0], 100, 100, null, 100, 100, null));
		validateObjectToFail.push(mockUp);

		resetMockUp();
		mockUp.userID = '1395668085709-15615611-85b9';
		mockUp.actions.push(setValidAction(null, eventType[0], 100, 100, 'elementId', 100, 100, null));
		validateObjectToFail.push(mockUp);

		resetMockUp();
		mockUp.userID = '1395668085709-15615611-85b9';
		mockUp.actions.push(setValidAction(Date.now(), null, 100, 100, 'elementId', 100, 100, null));
		validateObjectToFail.push(mockUp);

		resetMockUp();
		mockUp.userID = '1395668085709-15615611-85b9';
		mockUp.actions.push(setValidAction(Date.now(), eventType[0], 100, 100, 'elementId', -100, -100, null));
		validateObjectToFail.push(mockUp);

		resetMockUp();
		mockUp.actions = {};
		validateObjectToFail.push(mockUp);

		validateObjectToFail.push(null);

		validateObjectToFail.push('');

		validateObjectToFail.push('aaaa');
	};

};

module.exports = validatorHelper;