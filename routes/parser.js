// var validator = require('./validator');

var Parser = function() {


    this.parseObject = function(JSONstringified) {
        var obj = this.jsonParser(JSONstringified);
        var userID = this.getUserID(obj);
        var actions = this.getActions(obj);
        validateUserID();
    };

    this.jsonParser = function(JSONstringified) {
        return JSON.parse(JSONstringified);
    };

    this.getUserID = function(json) {
        return json.userID;
    };

    this.getActions = function(JSONobject) {
        return JSONobject.actions;
    };

};


module.exports = Parser;