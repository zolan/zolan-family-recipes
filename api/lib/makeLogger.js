var returnLogger = function(log4js, config, category) {
    log4js.configure(config)

    var logger = log4js.getLogger(category)

    logger.setLevel('INFO')

    return logger
}

module.exports = returnLogger
