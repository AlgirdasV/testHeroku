describe('Parser', function() {

    var Globals = require('../src/global/globals.js'),
        globals = new Globals(),
        dataEye = globals.init(),
        JSONObject = {},
        JSONstringified = {},
        JSONUserInfo = {
            userID: 'OIMTBfQ2hyb21lIDMzLjAuMTc1MC4xNTRfV2luZG93c18xNjAweDkwMF9lbi1VUyxlbjtxPTAuOCxsdDtxPTAuNl8xMzk1OTA2NDM1MDI1',
            'User-Agent':'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.154 Safari/537.36',
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