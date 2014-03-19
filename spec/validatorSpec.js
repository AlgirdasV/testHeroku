describe('Validator', function() {
  // require
  var Validator = require('../routes/validator.js'),
  validatorius = new Validator();

  var runs = [{
      desc: 'correct coordinates',
      args: [{
        positionX: 111,
        eventType: 'click',
        positionY: 222,
        elementID: 'form1',
        documentHeight: null,
        documentWidth: null,
        timeNow: Date.now() - 1000
      }],
      result: true
    }, {
      desc: 'incorrect coordinates',
      args: [{
        positionX: -2,
        eventType: 'dblclick',
        positionY: 222,
        elementID: 'form1',
        documentHeight: null,
        documentWidth: null,
        timeNow: Date.now() - 1000
      }],
      result: false
    }, {
      desc: 'correct null coordinates',
      args: [{
        positionX: null,
        eventType: 'resize',
        positionY: null,
        elementID: null,
        documentHeight: 12,
        documentWidth: 89,
        timeNow: Date.now() - 1000
      }],
      result: true
    }, {
      desc: 'incorrect null coordinates',
      args: [{
        positionX: -2,
        eventType: 'screen',
        positionY: null,
        elementID: null,
        documentHeight: 45,
        documentWidth: 23,
        timeNow: Date.now() - 1000
      }],
      result: false
    },

    {
      desc: 'correct window size',
      args: [{
        positionX: null,
        eventType: 'resize',
        positionY: null,
        elementID: 'form1',
        documentHeight: 33,
        documentWidth: 123,
        timeNow: Date.now() - 1000
      }],
      result: true
    }, {
      desc: 'incorrect window size',
      args: [{
        positionX: null,
        eventType: 'startScreen',
        positionY: null,
        elementID: 'form1',
        documentHeight: 'sss',
        documentWidth: null,
        timeNow: Date.now() - 1000
      }],
      result: false
    }, {
      desc: 'correct null window size',
      args: [{
        positionX: 44,
        eventType: 'dragstart',
        positionY: 56,
        elementID: 'form1',
        documentHeight: null,
        documentWidth: null,
        timeNow: Date.now() - 1000
      }],
      result: true
    }, {
      desc: 'incorrect null window size',
      args: [{
        positionX: 44,
        eventType: 'drop',
        positionY: 99,
        elementID: 'form1',
        documentHeight: 33,
        documentWidth: 123,
        timeNow: Date.now() - 1000
      }],
      result: false
    },

    {
      desc: 'correct timestamp',
      args: [{
        positionX: 0,
        eventType: 'scroll',
        positionY: 66,
        elementID: null,
        documentHeight: null,
        documentWidth: null,
        timeNow: Date.now() - 1000
      }],
      result: true
    }, {
      desc: 'incorrect timestamp',
      args: [{
        positionX: 3,
        eventType: 'dblclick',
        positionY: 66,
        elementID: 'sss',
        documentHeight: null,
        documentWidth: null,
        timeNow: Date.now() + 1000
      }],
      result: false
    },

  ];

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
  describe('validateAction function', function() {
    runs.forEach(function(run) {
      var verb = run.result ? 'passes' : 'fails';
      it(verb + ' when ' + run.desc, function() {
        var result = validatorius.validateAction.apply(this, run.args);
        expect(result).toEqual(run.result);
      });
    });
  });


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