describe('Parser', function() {

    var Globals = require('../src/global/globals.js'),
        globals = new Globals(),
        dataEye = globals.init(),
        JSONObject = {},
        JSONstringified = {},
        JSONUserInfo = {
            userID: 'asdfas',
            actions: [{
                synced: true,
                timeNow: Date.now(),
                eventType: 'click',
                positionX: 234,
                positionY: 343,
                elementId: ''
            }]
        };

    beforeEach(function() {
        JSONObject.headers = 'headers';
        JSONObject.body = {};
        JSONstringified = JSON.stringify(JSONUserInfo);
        JSONObject.body.message = JSONstringified;
    });

    afterEach(function() {
        JSONObject = {};
        JSONstringified = {};
    });

    describe('parseObject function', function() {

        it('calls jsonParser', function() {
            var spyEvent = spyOn(dataEye.emitter, 'emit');
            dataEye.parser.parseObject(JSONObject);
            expect(spyEvent).toHaveBeenCalled();
        });

    });

    describe('JSON parse function', function() {
        it('parses JSON string to object', function() {
            expect(JSON.parse(JSONstringified)).toEqual(JSONUserInfo);
        });

    });

});