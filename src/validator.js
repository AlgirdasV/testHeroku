var Validator = function() {

    var _eventsWithPosition = ['click', 'dblclick', 'focus', 'dragstart', 'drop', 'scroll', 'change'],
        _eventsWithScreenSize = ['resize', 'startscreen'],
        _eventsWithElementID = ['click', 'focus', 'dblclick', 'dragstart', 'drop', 'change'],
        _eventsWithUrl = ['click', 'startscreen'];

    function _shouldBeNull(self, post) {
        if (post !== null) {
            self.report('of event ' + self.origin.eventType + ' must be null');
        }
    }

    this.validatePosition = function(schema, post) {
        var self = this;
        if (dataEye._.contains(_eventsWithPosition, this.origin.eventType)) {
            if (post < 0) {
                this.report(this.origin.eventType + ' event position must be >=0');
            }
        } else {
            _shouldBeNull(self, post);
        }
    };

    this.validateScreenSize = function(schema, post) {
        var self = this;
        if (dataEye._.contains(_eventsWithScreenSize, this.origin.eventType)) {
            if (post <= 0) {
                this.report(this.origin.eventType + ' event screen size must be >0');
            }
        } else {
            _shouldBeNull(self, post);
        }
    };

    this.validateElementID = function(schema, post) {
        var self = this;
        if (dataEye._.contains(_eventsWithElementID, this.origin.eventType)) {
            if (typeof post !== 'string') {
                this.report(this.origin.eventType + ' event element id must be of string type');
            }
        } else {
            _shouldBeNull(self, post);
        }
    };

    this.validateUrl = function(schema, post) {
        var self = this;
        if (dataEye._.contains(_eventsWithUrl, this.origin.eventType)) {
            if (typeof post !== 'string') {
                this.report(this.origin.eventType + ' event element url must be of string type');
            }
        } else {
            _shouldBeNull(self, post);
        }
    };

    this.removeActionsWithErrors = function(obj, actionsWithErrors) {
        for (var i = 0; i < actionsWithErrors.length; i++) {
            console.log(actionsWithErrors[i]);
            obj.actions[actionsWithErrors[i]].eventType = 'Unknown';
        }
    };

    this.validate = function(object, info2) {
        var objectResult = this.validateObject(object, info2);
        // var objectResult = inspector.validate(objectSchema, object);
        var actionsWithErrors = [];
        if (!objectResult.valid) {
            console.log('Validation failed');
            dataEye.emitter.emit('onValidateFail', object);

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
                dataEye.emitter.emit('onValidateSuccess', object);
            } else {
                console.log('validated with errors, removing bad actions...');
                this.removeActionsWithErrors(object, actionsWithErrors);
                dataEye.emitter.emit('onValidateSuccess', object);
            }
        }

    };

    this.validateAction = function(action) {
        var result = dataEye.inspector.validate(dataEye.schemas.schema, action);
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

    this.validateObject = function(object, info2) {
        var temp = object.userID;
        console.log('temp', temp);
        object.userID = [temp, info2];
        return dataEye.inspector.validate(dataEye.schemas.objectSchema, object);
    };

};

module.exports = Validator;