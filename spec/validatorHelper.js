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

	this.header = {'user-agent':'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.154 Safari/537.36'};

	var resetMockUp = function() {
		mockUp = { 'userID' : 'KGMTBfQ2hyb21lIDMzLjAuMTc1MC4xNTRfV2luZG93c18xNjAweDkwMF9lbi1VUyxlbjtxPTAuOCxsdDtxPTAuNl8xMzk1OTEwMDYyNDE0'};
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

		mockUp.userID = 'KGMTBfQ2hyb21lIDMzLjAuMTc1MC4xNTRfV2luZG93c18xNjAweDkwMF9lbi1VUyxlbjtxPTAuOCxsdDtxPTAuNl8xMzk1OTEwMDYyNDE0';
		mockUp.actions.push(setValidAction(Date.now(), eventType[0], null, null, 'elementId', 100, 100, 'www.someUrl.com'));
		validateObjectToPass.push(mockUp);

		resetMockUp();
		mockUp.userID = 'KGMTBfQ2hyb21lIDMzLjAuMTc1MC4xNTRfV2luZG93c18xNjAweDkwMF9lbi1VUyxlbjtxPTAuOCxsdDtxPTAuNl8xMzk1OTEwMDYyNDE0';
		mockUp.actions.push(setValidAction(Date.now(), eventType[1], null, null, 'elementId', 100, 100, null));
		validateObjectToPass.push(mockUp);

		resetMockUp();
		mockUp.userID = 'KGMTBfQ2hyb21lIDMzLjAuMTc1MC4xNTRfV2luZG93c18xNjAweDkwMF9lbi1VUyxlbjtxPTAuOCxsdDtxPTAuNl8xMzk1OTEwMDYyNDE0';
		mockUp.actions.push(setValidAction(Date.now(), eventType[2], null, null, 'elementId', 100, 100, null));
		validateObjectToPass.push(mockUp);

		resetMockUp();
		mockUp.userID = 'KGMTBfQ2hyb21lIDMzLjAuMTc1MC4xNTRfV2luZG93c18xNjAweDkwMF9lbi1VUyxlbjtxPTAuOCxsdDtxPTAuNl8xMzk1OTEwMDYyNDE0';
		mockUp.actions.push(setValidAction(Date.now(), eventType[3], null, null, 'elementId', 100, 100, null));
		validateObjectToPass.push(mockUp);

		resetMockUp();
		mockUp.userID = 'KGMTBfQ2hyb21lIDMzLjAuMTc1MC4xNTRfV2luZG93c18xNjAweDkwMF9lbi1VUyxlbjtxPTAuOCxsdDtxPTAuNl8xMzk1OTEwMDYyNDE0';
		mockUp.actions.push(setValidAction(Date.now(), eventType[4], null, null, 'elementId', 100, 100, null));
		validateObjectToPass.push(mockUp);

		resetMockUp();
		mockUp.userID = 'KGMTBfQ2hyb21lIDMzLjAuMTc1MC4xNTRfV2luZG93c18xNjAweDkwMF9lbi1VUyxlbjtxPTAuOCxsdDtxPTAuNl8xMzk1OTEwMDYyNDE0';
		mockUp.actions.push(setValidAction(Date.now(), eventType[5], null, null, null, 100, 100, null));
		validateObjectToPass.push(mockUp);

		resetMockUp();
		mockUp.userID = 'KGMTBfQ2hyb21lIDMzLjAuMTc1MC4xNTRfV2luZG93c18xNjAweDkwMF9lbi1VUyxlbjtxPTAuOCxsdDtxPTAuNl8xMzk1OTEwMDYyNDE0';
		mockUp.actions.push(setValidAction(Date.now(), eventType[6], null, null, 'elementId', null, null, null));
		validateObjectToPass.push(mockUp);

		resetMockUp();
		mockUp.userID = 'KGMTBfQ2hyb21lIDMzLjAuMTc1MC4xNTRfV2luZG93c18xNjAweDkwMF9lbi1VUyxlbjtxPTAuOCxsdDtxPTAuNl8xMzk1OTEwMDYyNDE0';
		mockUp.actions.push(setValidAction(Date.now(), eventType[7], 100, 100, null, null, null, null));
		validateObjectToPass.push(mockUp);

		resetMockUp();
		mockUp.userID = 'KGMTBfQ2hyb21lIDMzLjAuMTc1MC4xNTRfV2luZG93c18xNjAweDkwMF9lbi1VUyxlbjtxPTAuOCxsdDtxPTAuNl8xMzk1OTEwMDYyNDE0';
		mockUp.actions.push(setValidAction(Date.now(), eventType[8], 100, 100, null, null, null, 'www.someUrl.com'));
		validateObjectToPass.push(mockUp);

		resetMockUp();
		mockUp.userID = 'KGMTBfQ2hyb21lIDMzLjAuMTc1MC4xNTRfV2luZG93c18xNjAweDkwMF9lbi1VUyxlbjtxPTAuOCxsdDtxPTAuNl8xMzk1OTEwMDYyNDE0';
		mockUp.actions.push(setValidAction(Date.now(), eventType[0], null, null, 'elementId', 100, 100, 'www.someUrl.com'));
		validateObjectToPass.push(mockUp);
	};

	// THESE SHOULD FAIL
	var setNotValidObjects = function() {
		resetMockUp();
		validateObjectToFail = [];
		mockUp.userID = 'GMTBfQ2hyb21lIDMzLjAuMTc1MC4xNTRfV2luZG93c18xNjAweDkwMF9lbi1VUyxlbjtxPTAuOCxsdDtxPTAuNl8xMzk1OTEwMDYyNDE0';
		mockUp.actions.push(setValidAction(Date.now(), eventType[0], -100, -100, 'elementId', 100, 100, 'www.someUrl.com'));
		validateObjectToFail.push(mockUp);

		resetMockUp();
		mockUp.userID = 'GMTBfQ2hyb21lIDMzLjAuMTc1MC4xNTRfV2luZG93c18xNjAweDkwMF9lbi1VUyxlbjtxPTAuOCxsdDtxPTAuNl8xMzk1OTEwMDYyNDE0';
		validateObjectToFail.push(mockUp);

		resetMockUp();
		mockUp.userID = 'GMTBfQ2hyb21lIDMzLjAuMTc1MC4xNTRfV2luZG93c18xNjAweDkwMF9lbi1VUyxlbjtxPTAuOCxsdDtxPTAuNl8xMzk1OTEwMDYyNDE0';
		mockUp.actions.push(setValidAction(Date.now(), eventType[0], 100, 100, 'elementId', 100, 100, null));
		validateObjectToFail.push(mockUp);

		resetMockUp();
		mockUp.userID = 'GMTBfQ2hyb21lIDMzLjAuMTc1MC4xNTRfV2luZG93c18xNjAweDkwMF9lbi1VUyxlbjtxPTAuOCxsdDtxPTAuNl8xMzk1OTEwMDYyNDE0';
		mockUp.actions.push(setValidAction(Date.now(), eventType[0], 100, 100, null, 100, 100, null));
		validateObjectToFail.push(mockUp);

		resetMockUp();
		mockUp.userID = 'GMTBfQ2hyb21lIDMzLjAuMTc1MC4xNTRfV2luZG93c18xNjAweDkwMF9lbi1VUyxlbjtxPTAuOCxsdDtxPTAuNl8xMzk1OTEwMDYyNDE0';
		mockUp.actions.push(setValidAction(null, eventType[0], 100, 100, 'elementId', 100, 100, null));
		validateObjectToFail.push(mockUp);

		resetMockUp();
		mockUp.userID = 'GMTBfQ2hyb21lIDMzLjAuMTc1MC4xNTRfV2luZG93c18xNjAweDkwMF9lbi1VUyxlbjtxPTAuOCxsdDtxPTAuNl8xMzk1OTEwMDYyNDE0';
		mockUp.actions.push(setValidAction(Date.now(), null, 100, 100, 'elementId', 100, 100, null));
		validateObjectToFail.push(mockUp);

		resetMockUp();
		mockUp.userID = 'GMTBfQ2hyb21lIDMzLjAuMTc1MC4xNTRfV2luZG93c18xNjAweDkwMF9lbi1VUyxlbjtxPTAuOCxsdDtxPTAuNl8xMzk1OTEwMDYyNDE0';
		mockUp.actions.push(setValidAction(Date.now(), eventType[0], 100, 100, 'elementId', -100, -100, null));
		validateObjectToFail.push(mockUp);

		/*resetMockUp();
		mockUp.actions = {};
		validateObjectToFail.push(mockUp);

		validateObjectToFail.push(null);

		validateObjectToFail.push('');

		validateObjectToFail.push('aaaa');*/
	};

};

module.exports = validatorHelper;