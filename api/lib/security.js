var returnSecurity = function(serverConfig) {
    return {
        handleAccessControlAllowOrigin: function(req, res, next) {
            for(var idx in serverConfig.allowedOrigins) {
                var referrer = serverConfig.allowedOrigins[idx]

                if(req.headers.origin === referrer) {
                    res.header('Access-Control-Allow-Origin', referrer)
                    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT')
                    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
                }
            }

            next()
        }
    }
}

module.exports = returnSecurity
