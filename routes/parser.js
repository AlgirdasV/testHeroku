//var validator = require('./validator');

var Parser = function() {


    this.parseObject = function(JSONstringified) {
        var obj = this.jsonParser(JSONstringified);
        eventEmitter.emit('OnParse', obj);
        //validateOjbect(obj);
        //dataRecorder(obj);
    };

    this.jsonParser = function(JSONstringified) {
        return JSON.parse(JSONstringified);
    };

    this.removeActionsWithErrors = function(obj, actionsWithErrors) {
		for (var i = 0; i < actionsWithErrors.length; i++) {
			obj.actions.splice(actionsWithErrors[i], 1);
		}
          // for (var i = 0; i < obj.actions.length; i++) {
          //     console.log(obj.actions[i]);
          // }
    };


};


module.exports = Parser;
