var app = require('../app');

var Listener = function () {

    this.init = function () {

        eventEmitter.on('onReceive', function (info) {
            console.log('\nData received', info);
            parser.parseObject(info);
        });
        eventEmitter.on('onParse', function (info) {
            console.log('\nData parsed');
            validator.validate(info);
        });
        eventEmitter.on('onValidateSuccess', function (info) {
            console.log('\nData validation succeed', info);
            // FIX validate if truly successful
            eventEmitter.emit('onRecordSuccess', info);
        });
        eventEmitter.on('onValidateFail', function (info) {
            console.log('\nData validation failed');
        });
        eventEmitter.on('onRecordSuccess', function (info) {
            console.log('\nData record succeed');
            fs.appendFile("./public/logs.txt", '\n' + JSON.stringify(info), function (err) {
                if (err) {
                    eventEmitter.emit('onRecordFail', err);
                } else {
                    console.log("The file was saved!");
                }
            });
        });
        eventEmitter.on('onRecordFail', function (info) {
            console.log('\nData record failed: ', info);
        });

        
    };
};

module.exports = Listener;