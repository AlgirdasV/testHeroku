var inspector = require('schema-inspector');

var Validator = function() {

  var clickSchema = {
      type: 'object',
      strict: true,
    properties: {
          eventType: { type:'string'},
          positionX: { type:'number'},
          positionY: { type:'number'},
          elementID: { type: 'string'},
          timeNow:   { type: 'number'}
         }
  };

  var focusSchema = {
      type: 'object',
      strict: true,
    properties: {
          eventType: { type: 'string'},
          positionX: { type: 'null'},
          positionY: { type: 'null'},
          elementID: { type: 'string'},
          timeNow:   { type: 'number'}
         }
  };

  var resizeSchema = {
      type: 'object',
      strict: true,
    properties: {
          eventType: { type:'string'},
          positionX: { type:'null'},
          positionY: { type:'null'},
          documentHeight: { type: 'number'},
          documentWidth: {type: 'number'},
          elementID: {type: null},
          timeNow:   { type: 'number'}
         }
  };

  var scrollSchema = {
        type: 'object',
        strict: true,
    properties: {
          eventType: { type:'string'},
          positionX: { type:'number'},
          positionY: { type:'number'},
          elementID: { type: 'null'},
          timeNow:   { type: 'number'}
         }
  };

  this.validate = function(obj) {
    var actions = object.actions;

    for (var i = actions.length - 1; i >= 0; i--) {
      var result = undefined;
      if (actions[i].eventType ==='click' || actions[i].eventType ==='dblclick'){
        result = inspector.validate(clickSchema,actions[i]); // Candidate is not valid
      }
      if (actions[i].eventType ==='focus'){
        result = inspector.validate(focusSchema,actions[i]);
      }
      if (actions[i].eventType ==='resize'){
        result = inspector.validate(resizeSchema,actions[i]);
      }
      if (actions[i].eventType ==='scroll'){
        result = inspector.validate(scrollSchema,actions[i]);
      }
      if (result !== undefined)
        console.log(result.format());
    };
  }

};

// object for testing:
var object = {
  userID: 'asdf',
  actions: [ {positionX: 12, positionY:145, eventType: 'click', elementID: 'form1', timeNow: Date.now()},
   {positionX: null, eventType: 'focus', positionY:null, elementID: 'form1', timeNow: Date.now()},
   {positionX: 0, eventType: 'scroll', positionY: 145, elementID: null, timeNow: Date.now()},
   {positionX: null, eventType: 'resize', positionY: null, elementID: null, documentHeight: 1453,documentWidth: 364, timeNow: Date.now()},
   {positionX: null, eventType: 'resize', positionY: null, elementID: null, timeNow: Date.now()}
   ]
};

validator = new Validator();
validator.validate(object);

module.exports = Validator;