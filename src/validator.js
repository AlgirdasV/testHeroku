var inspector = require('schema-inspector');
var app = require('../app');
var emiter = require('../app');

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
    var schemaPosX = 'number';
    var clickSchema = {
        type: 'object',
        strict: true,
        properties: {
            eventType: {
                type: 'string'
            },
            positionX: {
                type: schemaPosX,
                gte: 0
            },
            positionY: {
                type: 'number',
                gte: 0
            },
            documentHeight: {
                type: 'null'
            },
            documentWidth: {
                type: 'null'
            },
            elementId: {
                type: 'string'
            },
            timeNow: {
                type: 'number',
                /*lt: Date.now() */
                gt: 0
            },
            url: {
                type: 'string'
            }
        }
    };

    var focusSchema = {
        type: 'object',
        strict: true,
        properties: {
            eventType: {
                type: 'string'
            },
            positionX: {
                type: 'null'
            },
            positionY: {
                type: 'null'
            },
            documentHeight: {
                type: 'null'
            },
            documentWidth: {
                type: 'null'
            },
            elementId: {
                type: 'string'
            },
            timeNow: {
                type: 'number',
                /*lt: Date.now() */
                gt: 0
            },
            url: {
                type: null
            }
        }
    };

    var screenSchema = {
        type: 'object',
        strict: true,
        properties: {
            eventType: {
                type: 'string'
            },
            positionX: {
                type: 'null'
            },
            positionY: {
                type: 'null'
            },
            documentHeight: {
                type: 'number',
                gt: 0
            },
            documentWidth: {
                type: 'number',
                gt: 0
            },
            elementId: {
                type: null
            },
            timeNow: {
                type: 'number',
                /*lt: Date.now() */
                gt: 0
            },
            url: {
                type: null
            }
        }
    };

    var scrollSchema = {
        type: 'object',
        strict: true,
        properties: {
            eventType: {
                type: 'string'
            },
            positionX: {
                type: 'number',
                gte: 0
            },
            positionY: {
                type: 'number',
                gte: 0
            },
            documentHeight: {
                type: 'null'
            },
            documentWidth: {
                type: 'null'
            },
            elementId: {
                type: 'null'
            },
            timeNow: {
                type: 'number',
                /*lt: Date.now() */
                gt: 0
            },
            url: {
                type: null
            }
        }
    };

    this.removeActionsWithErrors = function(obj, actionsWithErrors) {
        for (var i = 0; i < actionsWithErrors.length; i++) {
            console.log(actionsWithErrors[i]);
            obj.actions[actionsWithErrors[i]].eventType = 'Unknow';
            // var unknownAction = {
            // timeNow: obj.actions[actionsWithErrors[i]].timeNow,
            // eventType: 'Unknown'
            // // positionX: obj.actions[actionsWithErrors[i]].positionX,
            // // positionY: obj.actions[actionsWithErrors[i]].positionY,
            // // elementId: obj.actions[actionsWithErrors[i]].elementId,
            // // documentHeight: obj.actions[actionsWithErrors[i]].documentHeight,
            // // documentWidth: obj.actions[actionsWithErrors[i]].documentWidth
            // };
            // obj.actions.splice(actionsWithErrors[i], 1, unknownAction);
        }
    };
    this.validate = function(object) {
        var objectResult = this.validateObject(object);
        // var objectResult = inspector.validate(objectSchema, object);
        var actionsWithErrors = [];
        if (!objectResult.valid) {
            console.log('Validation failed');
            app.eventEmitter.emit('onValidateFail');

        } else {
            var actions = object.actions;
            for (var i = actions.length - 1; i >= 0; i--) {
                var validated = this.validateAction(actions[i]);
                //console.log(result.format());
                if (!validated) {
                    actionsWithErrors.push(i);
                }

            }
            if (actionsWithErrors.length === 0) {
                app.eventEmitter.emit('onValidateSuccess', object);
            } else {
                console.log('validated with errors, removing bad actions...');
                this.removeActionsWithErrors(object, actionsWithErrors);
                app.eventEmitter.emit('onValidateSuccess', object);
            }
        }

    };
    this.validateAction = function(action) {
        var result = undefined;
        var validated = false;
        if (action.eventType === 'click' || action.eventType === 'dblclick' || action.eventType === 'dragstart' || action.eventType === 'drop') {
            result = inspector.validate(clickSchema, action); // Candidate is not valid
            validated = true;
        }
        if (action.eventType === 'focus') {
            result = inspector.validate(focusSchema, action);
            validated = true;
        }
        if (action.eventType === 'resize' || action.eventType === 'startScreen') {
            result = inspector.validate(screenSchema, action);
            validated = true;
        }
        if (action.eventType === 'scroll') {
            result = inspector.validate(scrollSchema, action);
            validated = true;
        }

        if (!validated || !result.valid) {
            return false;
        } else {
            return true;
        }

    };

    this.validateObject = function(object) {
        return inspector.validate(objectSchema, object);
    };
};

module.exports = Validator;