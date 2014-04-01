var Schemas = function() {

    this.idSchema = {
        type: 'object',
        strict: true,
        properties: {
            userID: {
                type: 'array',
                exec: function(schema, post) {
                    if (post && post.length === 2 && post[0] !== undefined && post[1] !== undefined) {
                        var head = post[0],
                            info = dataEye.idGenerator.decode(post[1].userID),
                            splits = info.split('_'),
                            id = parseInt(splits[0]),
                            fullBrowser = splits[1],
                            os = splits[2],
                            lang = splits[3],
                            time = splits[4];
                        if (time === undefined || id === undefined || fullBrowser === undefined || os === undefined || lang === undefined) {
                            this.report('ID is not valid ');
                        } else {
                            //FIX TODO add check by browser
                            if ((Date.now() < time) || os !== dataEye.idGenerator.genOs(head['user-agent']) || !dataEye.idGenerator.check(id)) {
                                this.report('ID is not valid ');
                            }
                        }
                    } else {
                        this.report(post + 'was undefined');
                    }

                }
            }
        }

    };

    this.objectSchema = {
        type: 'object',
        strict: true,
        properties: {
            userID: {
                type: 'array',
                exec: function(schema, post) {
                    console.log('postas:', post /*, post[1], post[2]*/ );
                    if (post && post.length === 2 && post[0] !== undefined && post[1] !== undefined) {
                        var head = post[1],
                            info = dataEye.idGenerator.decode(post[0]),
                            splits = info.split('_'),
                            id = parseInt(splits[0]),
                            fullBrowser = splits[1],
                            os = splits[2],
                            lang = splits[3],
                            time = splits[4];
                        if (time === undefined || id === undefined || fullBrowser === undefined || os === undefined || lang === undefined) {
                            console.log('fail1');
                            this.report('ID is not valid ');
                        } else {
                            //FIX TODO add check by browser
                            if ((Date.now() < time) || os !== dataEye.idGenerator.genOs(head['user-agent']) || !dataEye.idGenerator.check(id)) {
                                console.log('fail2');
                                this.report('ID is not valid ');
                            }
                        }
                    } else {
                        this.report(post + 'was undefined');
                        //console.log('fail3');
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