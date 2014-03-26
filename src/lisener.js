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
            console.log('\nData received', info.body.message);
            parser.parseObject(info);
        });
        emitter.on('onParse', function (info, info2) {
            console.log('\nData parsed');
            validator.validate(info, info2);
        });
        emitter.on('onValidateSuccess', function (info) {
            console.log('\nData validation succeed', info);
            // FIX validate if truly successful
            emitter.emit('onRecordSuccess', info);
        });
        emitter.on('onValidateFail', function (info) {
            console.log('\nData validation failed');
            emitter.emit('onRecordFail', info);
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
            fs.appendFile("./public/faillogs.txt", '\n' + JSON.stringify(info), function (err) {
                console.log("The failed recod file was saved!");
            });
        });


    };
};

module.exports = Listener;