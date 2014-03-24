describe('Parser', function() {
    // require
    var JSONObject,
        JSONstringified,
        Parser = require('../src/parser.js'),
        parser = new Parser(),
        ValidatorHelper = require('./ValidatorHelper.js'),
        validatorHelper = new ValidatorHelper();
        // validate = require('../routes/validator'),
        // validator = new validate();

    beforeEach(function() {

        JSONObject = {
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
        JSONstringified = JSON.stringify(JSONObject);
    });
    afterEach(function() {
        // parser = undefined;
        JSONObject = undefined;
        JSONstringified = undefined;
    });
    describe('parseObject function', function() {
        it('calls jsonParser', function() {
            var spyEvent = spyOn(parser, "jsonParser");
            // parser.jsonParser(JSONstringified);.and.callThrough()
            parser.parseObject(JSONObject);
            expect(spyEvent).toHaveBeenCalled();
        });

    });

    describe('jsonParser function', function() {
        it('parses JSON string to object', function() {
            expect(parser.jsonParser(JSONstringified)).toEqual(JSONObject);
        });

    });

});