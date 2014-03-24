describe('Validator', function() {
    // require
    var Validator = require('../src/validator.js'),
        validatorius = new Validator(),
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


    // userID
    describe('validateObject function', function() {

        it('validates correct object', function() {
            var arrayToTestArray = validatorHelper.getPassingValidateObj();
            //console.log('start', arrayToTestArray);

            for (var i = 0; i < arrayToTestArray.length; i++) {
                var objToTest = validatorius.validateObject(arrayToTestArray[i]);
                //console.log('tinka', objToTest);
                expect(objToTest.valid).toBeTruthy();
            }
        });

        it('validates incorrect object', function() {
            var arrayToTestArray = validatorHelper.getFailingValidateObj();
            //console.log('start', arrayToTestArray);

            for (var i = 0; i < arrayToTestArray.length; i++) {
                var objToTest = validatorius.validateObject(arrayToTestArray[i]);
                //console.log('tinka', objToTest);
                expect(objToTest.valid).not.toBeTruthy();
            }
        });

        it('should not throw error when userIP is undefined', function() {
            expect(function() {
                validatorius.validateObject(objectWithoutUserID);
            }).not.toThrow();

        });

    });
});