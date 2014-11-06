var returnLogger = function(log4js, config) {
    log4js.configure(config)

    var logger = log4js.getLogger('server')

    logger.setLevel('INFO')

    return logger
}

module.exports = returnLogger
