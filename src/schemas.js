/*var Globals = require('./src/global/globals.js'),
    globals = new Globals(),
    dataEye = globals.dataEye;*/

var Schemas = function() {

    this.objectSchema = {
        type: 'object',
        strict: true,
        properties: {
            userID: {
                type: 'array',
                exec: function(schema, post) {
                    if (post) {
                        var head = post[1],
                            info = dataEye.idGenerator.decode(post[0]),
                            splits = info.split('_'),
                            id = parseInt(splits[0]),
                            fullBrowser = splits[1],
                            os = splits[2];
                        lang = splits[3];
                        time = splits[4];
                        if (time === undefined || id === undefined || fullBrowser === undefined || os === undefined || lang === undefined) {
                            this.report('ID is not valid ');
                        } else {
                            //FIX TODO add check by browser and time
                            if (os !== genetaror.genOs(head['user-agent']) || !genetaror.check(id)) {
                                this.report('ID is not valid ');
                            }
                        }
                    } else {
                        this.report(post + 'was undefined');
                    }
                }
            },
            actions: {
                type: 'array'
            }
        }
    };

    this.schema = {
        type: 'object',
        strict: true,
        properties: {
            eventType: {
                type: 'string'
            },
            positionX: {
                exec: dataEye.validator.validatePosition
            },
            positionY: {
                exec: dataEye.validator.validatePosition
            },
            documentHeight: {
                exec: dataEye.validator.validateScreenSize
            },
            documentWidth: {
                exec: dataEye.validator.validateScreenSize
            },
            elementId: {
                exec: dataEye.validator.validateElementID
            },
            timeNow: {
                type: 'number',
                /*lt: Date.now() */
                gt: 0
            },
            url: {
                exec: dataEye.validator.validateUrl
            }
        }
    };
};

module.exports = Schemas;