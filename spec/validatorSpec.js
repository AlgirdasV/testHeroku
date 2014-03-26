describe('Validator', function() {
    // require
    var Validator = require('../src/validator.js'),
        validator = new Validator(),
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


    describe('validateObject function', function() {
        var i = 1;
        beforeEach(function() {
            spyOn(validator, 'removeActionsWithErrors');
        });

        afterEach(function() {
            console.log('test nb: ' + i + ' number of errors in actions: ' + validator.removeActionsWithErrors.callCount);
            i++;
            validator.removeActionsWithErrors.reset();
        });

        it('validates correct object', function() {
            var arrayToTestArray = validatorHelper.getPassingValidateObj();
            for (var i = 0; i < arrayToTestArray.length; i++) {
                var objToTest = validator.validate(arrayToTestArray[i]);
                var objToTest2 = validator.validateObject(arrayToTestArray[i]);
                expect(objToTest2.valid).toBe(true);
            }
            expect(validator.removeActionsWithErrors.callCount).toBe(0);
        });

        it('validates incorrect object', function() {
            var arrayToTestArray = validatorHelper.getFailingValidateObj(),
                numberOfFailedId = 0;

            for (var i = 0; i < arrayToTestArray.length; i++) {
                var objToTest = validator.validate(arrayToTestArray[i]);
                var objToTest2 = validator.validateObject(arrayToTestArray[i]);
                if (objToTest2.valid !== undefined && objToTest2.valid === false) {
                    numberOfFailedId++;
                }
            }
            //console.log('numberOfFailedId',numberOfFailedId, 'arrayToTestArray.length', arrayToTestArray.length);
            expect(validator.removeActionsWithErrors.callCount).toBe(arrayToTestArray.length - numberOfFailedId);
        });

        /*it('should not throw error when userIP is undefined', function() {
            expect(function() {
                validator.validateObject(objectWithoutUserID);
            }).not.toThrow();

        });*/

    });
});