var loggerConfigReturner = function(logFile, category) {
    return {
        "appenders": [
            {
                "type": "file",
                "filename": logFile,
                "maxLogSize": 20480,
                "backups": 10,
                "category": category
            }
        ]
    }
}

module.exports = loggerConfigReturner
