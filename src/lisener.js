// var app = require('../app');
var emitter = require('./emitter.js').eventEmitter,
    parserModule = require('./parser.js'),
    parser = new parserModule(),
    validatorModule = require('./validator.js'),
    validator = new validatorModule(),
    fs = require('fs');

var Listener = function () {

    this.init = function () {

        emitter.on('onReceive', function (info) {
            console.log('\nData received', info);
            parser.parseObject(info);
        });
        emitter.on('onParse', function (info) {
            console.log('\nData parsed');
            validator.validate(info);
        });
        emitter.on('onValidateSuccess', function (info) {
            console.log('\nData validation succeed', info);
            // FIX validate if truly successful
            emitter.emit('onRecordSuccess', info);
        });
        emitter.on('onValidateFail', function (info) {
            console.log('\nData validation failed');
        });
        emitter.on('onRecordSuccess', function (info) {
            console.log('\nData record succeed');
            fs.appendFile("./public/logs.txt", '\n' + JSON.stringify(info), function (err) {
                if (err) {
                    emitter.emit('onRecordFail', err);
                } else {
                    console.log("The file was saved!");
                }
            });
        });
        emitter.on('onRecordFail', function (info) {
            console.log('\nData record failed: ', info);
        });


    };
};

module.exports = Listener;