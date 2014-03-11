var inspector = require('schema-inspector');

var Validator = function() {

  var clickSchema = {
      type: 'object',
      strict: true,
    properties: {
          eventType: { type:'string'},
          positionX: { type:'number'},
          positionY: { type:'number'},
          documentHeight: { type: 'null'},
          documentWidth: {type: 'null'},
          elementID: { type: 'string'},
          timeNow:   { type: 'number'}
         }
  };

  var focusSchema = {
      type: 'object',
      strict: true,
    properties: {
          eventType: { type: 'string'},
          positionX: { type: 'number'},
          positionY: { type: 'number'},
          documentHeight: { type: 'null'},
          documentWidth: {type: 'null'},
          elementID: { type: 'string'},
          timeNow:   { type: 'number'}
         }
  };

  var screenSchema = {
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
          documentHeight: { type: 'null'},
          documentWidth: {type: 'null'},
          elementID: { type: 'null'},
          timeNow:   { type: 'number'}
         }
  };

this.validateUserID = function(object) {
    var splits = object.userID.split(':'),
        userIP = splits[0],
        ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if(userIP.match(ipformat)) {
        console.log('TRUE');
    } else  {
        console.log('IP is not valid ');
    }

};

  this.validate = function(object) {
    var actions = object.actions;
    for (var i = actions.length - 1; i >= 0; i--) {
      var result = undefined;
      if (actions[i].eventType ==='click' || actions[i].eventType ==='dblclick' || actions[i].eventType ==='dragstart' || actions[i].eventType ==='drop'){
        result = inspector.validate(clickSchema,actions[i]); // Candidate is not valid
      }
      if (actions[i].eventType ==='focus'){
        result = inspector.validate(focusSchema,actions[i]);
      }
      if (actions[i].eventType ==='resize' || actions[i].eventType ==='startScreen'){
        result = inspector.validate(screenSchema,actions[i]);
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
  userID: '33.3333.33.3:Chrome',
  actions: [ {positionX: 12, positionY:145, eventType: 'click', elementID: 'form1', timeNow: Date.now()},
   {positionX: 111, eventType: 'focus', positionY:222, elementID: 'form1', timeNow: Date.now()},
   {positionX: 0, eventType: 'scroll', positionY: 145, elementID: null, timeNow: Date.now()},
   {positionX: null, eventType: 'resize', positionY: null, elementID: null, documentHeight: 1453,documentWidth: 364, timeNow: Date.now()},
   {positionX: null, eventType: 'resize', positionY: null, elementID: null, timeNow: Date.now()}
   ]
};

validator = new Validator();

validator.validateUserID(object);
validator.validate(object);
module.exports = Validator;