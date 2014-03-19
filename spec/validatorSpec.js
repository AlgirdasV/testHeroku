describe('Validator', function() {
  // require
  var Validator = require('../src/validator.js'),
  validatorius = new Validator();

  var correctObject = {
    userID: '33.23.33.3:Chrome',
    // userID: '',
    actions: []
  };

  var incorrectObject = {
    userID: '33.2333.33.3:Chrome',
    // userID: '',
    actions: 5
  };

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
      expect(validatorius.validateObject(correctObject)).toBeTruthy();
    });

    it('validates incorrect object', function() {
      expect(validatorius.validateObject(incorrectObject)).toBeTruthy();
    });

    it('should not throw error when userIP is undefined', function() {
        expect(function(){validatorius.validateObject(objectWithoutUserID);}).not.toThrow();
    });

  });
});