var configReturner = function(basedir) {
    return {
        banner:   "Connected to Zolan's Family Recipe API.",
        port:     6622,
        dbFile:   basedir + '/var/data/family_recipes.sqlite',
        logFile:  basedir + '/var/log/server.log',
        //
        allowedOrigins: [
            'http://www.zolan.org',
            'http://zolan.org'
        ]
    }
}

module.exports = configReturner
