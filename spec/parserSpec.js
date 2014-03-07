describe('Parser', function() {
    // require
    var JSONObject,
        JSONstringified,
        parser = require('../routes/parser'),
        parseris = new parser(),
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

        // it('calls getUserID', function() {
        //     spyOn(parser, "getUserID").and.callThrough();
        //     parser.parseObject(JSONstringified);
        //     expect(parser.getUserID).toHaveBeenCalled();
        // });

        // it('calls getActions', function() {
        //     spyOn(parser, "getActions").and.callThrough();
        //     parser.parseObject(JSONstringified);
        //     expect(parser.getActions).toHaveBeenCalled();
        // });

        // it('calls validateUserID', function() {
        //     spyOn(parser, "validateUserID").and.callThrough();
        //     parser.parseObject(JSONstringified);
        //     expect(parser.validateUserID).toHaveBeenCalled();
        // });

    // });

    describe('jsonParser function', function() {
        it('parses JSON string to object', function() {
            expect(parseris.jsonParser(JSONstringified)).toEqual(JSONObject);
        });

    });
    describe('getUserID function', function() {
        it('returns user ID', function() {
            expect(parseris.getUserID(JSONObject)).toEqual(JSONObject.userID);
        });

    });

    describe('getActions function', function() {
        it('returns user actions array', function() {
            expect(parseris.getActions(JSONObject)).toEqual(JSONObject.actions);
        });

    });



});