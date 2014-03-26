/*var Globals = require('./src/global/globals.js'),
    globals = new Globals(),
    dataEye = globals.dataEye;*/
// var app = require('../app');
var fs = require('fs');

var Listener = function() {

    this.init = function() {

        dataEye.emitter.on('onReceive', function(info) {
            console.log('\nData received', info.body.message);
            dataEye.parser.parseObject(info);
        });

        dataEye.emitter.on('onParse', function(info, info2) {
            console.log('\nData parsed');
            dataEye.validator.validate(info, info2);
        });

        dataEye.emitter.on('onValidateSuccess', function(info) {
            console.log('\nData validation succeed', info);
            // FIX validate if truly successful
            dataEye.emitter.emit('onRecordSuccess', info);
        });

        dataEye.emitter.on('onValidateFail', function(info) {
            console.log('\nData validation failed');
            dataEye.emitter.emit('onRecordFail', info);
        });

        dataEye.emitter.on('onRecordSuccess', function(info) {
            console.log('\nData record succeed');
            fs.appendFile("./public/logs.txt", '\n' + JSON.stringify(info), function(err) {
                if (err) {
                    dataEye.emitter.emit('onRecordFail', err);
                } else {
                    console.log("The file was saved!");
                }
            });
        });

        dataEye.emitter.on('onRecordFail', function(info) {
            console.log('\nData record failed: ', info);
            fs.appendFile("./public/faillogs.txt", '\n' + JSON.stringify(info), function(err) {
                console.log("The failed recod file was saved!");
            });
        });

    };
};

module.exports = Listener;