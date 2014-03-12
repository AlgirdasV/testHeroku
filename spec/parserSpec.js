describe('Parser', function() {
    // require
    var JSONObject,
        JSONstringified,
        Parser = require('../routes/parser.js'),
        parseris = new Parser(),
        validate = require('../routes/validator'),
        validator = new validate();

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
        // parseris = undefined;
        JSONObject = undefined;
        JSONstringified = undefined;
    });
    // describe('parseObject function', function() {
        // it('calls jsonParser', function() {

        //     spyOn(parseris, "jsonParser").and.callThrough();
        //     // parser.jsonParser(JSONstringified);
        //     // parser.parseObject(JSONstringified);
        //     expect(parseris.jsonParser).toHaveBeenCalled();
        // });

    // });

    describe('jsonParser function', function() {
        it('parses JSON string to object', function() {
            expect(parseris.jsonParser(JSONstringified)).toEqual(JSONObject);
        });

    });

});