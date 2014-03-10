//var validator = require('./validator');

var Parser = function() {


    this.parseObject = function(JSONstringified) {
        var obj = this.jsonParser(JSONstringified);
        validateOjbect(obj);
        dataRecorder(obj);
    };

    this.jsonParser = function(JSONstringified) {
        return JSON.parse(JSONstringified);
    };

};


module.exports = Parser;