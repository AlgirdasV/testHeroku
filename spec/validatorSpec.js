describe('Validator', function() {
    // require
    var Globals = require('../src/global/globals.js'),
        globals = new Globals(),
        dataEye = globals.init(),
        ValidatorHelper = require('./validatorHelper.js'),
        validatorHelper = new ValidatorHelper();
    validatorHelper.init();

    var objectWithoutUserID = {
        actions: []
    };
    // an example, not a general case
    // describe('validateAction function', function() {
    //   runs.forEach(function(run) {
    //     var verb = run.result ? 'passes' : 'fails';
    //     it(verb + ' when ' + run.desc, function() {
    //       var result = validatorius.validateAction.apply(this, run.args);
    //       expect(result).toEqual(run.result);
    //     });
    //   });
    // });


    var i = 1;
    beforeEach(function() {
        spyOn(dataEye.validator, 'removeActionsWithErrors');
        spyOn(dataEye.emitter, 'emit');
    });

    afterEach(function() {
        console.log('test nb: ' + i + ' number of errors in actions: ' + dataEye.validator.removeActionsWithErrors.callCount);
        i++;
        dataEye.validator.removeActionsWithErrors.reset();
    });

    it('validates correct object', function() {
        var arrayToTestArray = validatorHelper.getPassingValidateObj();
        for (var i = 0; i < arrayToTestArray.length; i++) {
            var objToTest = dataEye.validator.validate(arrayToTestArray[i], validatorHelper.header);
            var objToTest2 = dataEye.validator.validateObject(arrayToTestArray[i], validatorHelper.header);
            expect(objToTest2.valid).toBe(true);
        }
        expect(dataEye.validator.removeActionsWithErrors.callCount).toBe(0);
    });

    it('validates incorrect object', function() {
        var arrayToTestArray = validatorHelper.getFailingValidateObj(),
            numberOfFailedId = 0;

        for (var i = 0; i < arrayToTestArray.length; i++) {
            var objToTest = dataEye.validator.validate(arrayToTestArray[i], validatorHelper.header);
            var objToTest2 = dataEye.validator.validateObject(arrayToTestArray[i], validatorHelper.header);
            if (objToTest2.valid !== undefined && objToTest2.valid === false) {
                numberOfFailedId++;
            }
        }
        expect(dataEye.validator.removeActionsWithErrors.callCount).toBe(arrayToTestArray.length - numberOfFailedId);
    });

    /*it('should not throw error when userIP is undefined', function() {
            expect(function() {
                validator.validateObject(objectWithoutUserID);
            }).not.toThrow();

        });*/

});