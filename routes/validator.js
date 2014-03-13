var inspector = require('schema-inspector');
var app = require('../app');
//var emiter = require('app');

var Validator = function() {

    var objectSchema = {
        type: 'object',
        strict: true,
        properties: {
            userID: {
                type: 'string',
                exec: function(schema, post) {
                    var splits = post.split(':'),
                        userIP = splits[0],
                        ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
                    if (!userIP.match(ipformat)) {
                        this.report('IP is not valid ');
                    }
                }
            },
            actions: {
                type: 'array'
            }
        }
    };

  var clickSchema = {
      type: 'object',
      strict: true,
    properties: {
          eventType: { type:'string'},
          positionX: { type:'number', gte: 0},
          positionY: { type:'number', gte: 0},
          documentHeight: { type: 'null'},
          documentWidth: {type: 'null'},
          elementID: { type: 'string'},
          timeNow:   { type: 'number', lt: Date.now(), gt: 0}
         }
  };

  var focusSchema = {
      type: 'object',
      strict: true,
    properties: {
          eventType: { type: 'string'},
          positionX: { type:'number', gte: 0},
          positionY: { type:'number', gte: 0},
          documentHeight: { type: 'null'},
          documentWidth: {type: 'null'},
          elementID: { type: 'string'},
          timeNow:   { type: 'number', lt: Date.now(), gt: 0}
         }
  };

  var screenSchema = {
      type: 'object',
      strict: true,
    properties: {
          eventType: { type:'string'},
          positionX: { type:'null'},
          positionY: { type:'null'},
          documentHeight: { type: 'number', gt: 0},
          documentWidth: {type: 'number', gt: 0},
          elementID: {type: null},
          timeNow:   { type: 'number', lt: Date.now(), gt: 0}
         }
  };

  var scrollSchema = {
        type: 'object',
        strict: true,
    properties: {
          eventType: { type:'string'},
          positionX: { type:'number', gte: 0},
          positionY: { type:'number', gte: 0},
          documentHeight: { type: 'null'},
          documentWidth: {type: 'null'},
          elementID: { type: 'null'},
          timeNow:   { type: 'number', lt: Date.now(), gt: 0}
         }
  };

  this.removeActionsWithErrors = function(obj, actionsWithErrors) {
    for (var i = 0; i < actionsWithErrors.length; i++) {
      console.log(actionsWithErrors[i]);
      obj.actions.splice(actionsWithErrors[i], 1);
    }
    // Watch good actions
          // for (var i = 0; i < obj.actions.length; i++) {
          //     console.log(obj.actions[i]);
          // }
    };
  this.validate = function(object) {
    var objectResult = inspector.validate(objectSchema, object);
    var actionsWithErrors = [];
    if (!objectResult.valid) {
        //publish('validation failed');
        console.log('Validation failed');
        app.eventEmitter.emit('onValidateFail');

    } else {
        var actions = object.actions;
        for (var i = actions.length - 1; i >= 0; i--) {
          var result = undefined;
          var validated = false;
          if (actions[i].eventType ==='click' || actions[i].eventType ==='dblclick' || actions[i].eventType ==='dragstart' || actions[i].eventType ==='drop'){
            result = inspector.validate(clickSchema,actions[i]); // Candidate is not valid
            validated = true;
          }
          if (actions[i].eventType ==='focus'){
            result = inspector.validate(focusSchema,actions[i]);
            validated = true;
          }
          if (actions[i].eventType ==='resize' || actions[i].eventType ==='startScreen'){
            result = inspector.validate(screenSchema,actions[i]);
            validated = true;
          }
          if (actions[i].eventType ==='scroll'){
            result = inspector.validate(scrollSchema,actions[i]);
            validated = true;
          }
          //console.log(result.format());
          if(!validated || !result.valid){
              actionsWithErrors.push(i);
          }

        }
        if (actionsWithErrors.length === 0) {
            //publish('validation succeeded');
            app.eventEmitter.emit('onValidateSuccess');
        }
        else {
            //publish('validated with errors', actionsWithErrors);
            console.log('validated with errors, removing bad actions...');
            this.removeActionsWithErrors(object, actionsWithErrors);
            app.eventEmitter.emit('onValidateSuccess');
    }

    }
    
  };
};

// object for testing:
// var object = {
//   userID: '33.23.33.3:Chrome',
//   // userID: '',
//   actions: [ {positionX: 12, positionY:145, eventType: 3, elementID: 'form1', documentHeight: null,documentWidth: null,timeNow: Date.now()-1},
//    {positionX: 111, eventType: 'focus', positionY:222, elementID: 'form1', documentHeight: null,documentWidth: null, timeNow: Date.now()-1},
//    {positionX: 0, eventType: 'scroll', positionY: -1, elementID: null, documentHeight: null,documentWidth: null, timeNow: Date.now()-1},
//    {positionX: null, eventType: 'resize', positionY: null, elementID: null, documentHeight: 1453,documentWidth: 364, timeNow: Date.now()-1},
//    {positionX: null, eventType: 'resize', positionY: 67, elementID: null, documentHeight: 1453,documentWidth: 364, timeNow: Date.now()-1}
//    ]
// };

// validator = new Validator();

// // validator.validateUserID(object);
// validator.validate(object);
module.exports = Validator;