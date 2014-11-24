var loggerConfigReturner = function(logFile, category, shouldSendToConsole) {

    var appenders = []

    if (shouldSendToConsole) {
        appenders.push({
            type:       'console',
            "category": category
        })
    }

    appenders.push({
        "type":       "file",
        "filename":   logFile,
        "maxLogSize": 20480,
        "backups":    10,
        "category":   category
    })

    return {
        "appenders": appenders
    }
}

module.exports = loggerConfigReturner
