var inspector = require('schema-inspector'),
    _ = require('underscore')._,
    emitter = require('./emitter.js').eventEmitter;

var Validator = function() {

    var objectSchema = {
        type: 'object',
        strict: true,
        properties: {
            userID: {
                type: 'string',
                exec: function(schema, post) {
                    if (post){
                        var splits = post.split('-'),
                            timeNow = parseInt(splits[0]),
                            randFirst = splits[1],
                            randSecond = splits [2];
                        if(isNaN(timeNow) || timeNow > Date.now() || randFirst.length != 8 || randSecond.length != 4) {
                            this.report('IP is not valid ');
                        }
                    }
                    else this.report(post+'was undefined');
                }
            },
            actions: {
                type: 'array'
            }
        }
    };

    var schema = {
        type: 'object',
        strict: true,
        properties: {
            eventType: {
                type: 'string'
            },
            positionX: {
                exec: validatePosition
            },
            positionY: {
                exec: validatePosition
            },
            documentHeight: {
                exec: validateScreenSize
            },
            documentWidth: {
                exec: validateScreenSize
            },
            elementId: {
                exec: validateElementID
            },
            timeNow: {
                type: 'number',
                /*lt: Date.now() */
                gt: 0
            },
            url: {
                exec: validateUrl
            }
        }
    };

    var eventsWithPosition = ['click', 'dblclick', 'focus', 'dragstart', 'drop', 'scroll', 'change'],
        eventsWithScreenSize = ['resize', 'startscreen'],
        eventsWithElementID = ['click', 'focus', 'dblclick', 'dragstart', 'drop', 'change'],
        eventsWithUrl = ['click', 'startscreen'];

    function shouldBeNull(self, post) {
        if (post !== null) {
            self.report('of event ' + self.origin.eventType + ' must be null');
        }
    }

    function validatePosition(schema, post) {
        var self = this;
        if (_.contains(eventsWithPosition, this.origin.eventType)) {
            if (post < 0) {
                this.report(this.origin.eventType + ' event position must be >=0');
            }
        } else {
            shouldBeNull(self, post);
        }
    }

    function validateScreenSize(schema, post) {
        var self = this;
        if (_.contains(eventsWithScreenSize, this.origin.eventType)) {
            if (post <= 0) {
                this.report(this.origin.eventType + ' event screen size must be >0');
            }
        } else {
            shouldBeNull(self, post);
        }
    }

    function validateElementID(schema, post) {
        var self = this;
        if (_.contains(eventsWithElementID, this.origin.eventType)) {
            if (typeof post !== 'string') {
                this.report(this.origin.eventType + ' event element id must be of string type');
            }
        } else {
            shouldBeNull(self, post);
        }
    }

    function validateUrl(schema, post) {
        var self = this;
        if (_.contains(eventsWithUrl, this.origin.eventType)) {
            if (typeof post !== 'string') {
                this.report(this.origin.eventType + ' event element url must be of string type');
            }
        } else {
            shouldBeNull(self, post);
        }
    }

    this.removeActionsWithErrors = function(obj, actionsWithErrors) {
        for (var i = 0; i < actionsWithErrors.length; i++) {
            console.log(actionsWithErrors[i]);
            obj.actions[actionsWithErrors[i]].eventType = 'Unknow';
        }
    };
    this.validate = function(object) {
        var objectResult = this.validateObject(object);
        // var objectResult = inspector.validate(objectSchema, object);
        var actionsWithErrors = [];
        if (!objectResult.valid) {
            console.log('Validation failed');
            emitter.emit('onValidateFail');

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
                emitter.emit('onValidateSuccess', object);
            } else {
                console.log('validated with errors, removing bad actions...');
                this.removeActionsWithErrors(object, actionsWithErrors);
                emitter.emit('onValidateSuccess', object);
            }
        }

    };
    this.validateAction = function(action) {
        var result = inspector.validate(schema, action);
        if (result && result.format) {
            console.log('event ');
            console.dir(action);
            console.log(+' ' + result.format());
            console.log();
            //^^ For testing purposes ;)
        }
        if (!result.valid) {
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