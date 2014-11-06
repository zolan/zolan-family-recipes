var returnSecurity = function(serverConfig) { return {
    handleAccessControlAllowOrigin: function(req, res, next) {
        for(var idx in serverConfig.allowedOrigins) {
            var referrer = serverConfig.allowedOrigins[idx]

            if(req.headers.origin === referrer) {
                res.header('Access-Control-Allow-Origin', referrer)
            }
        }

        next()
    }
} }

module.exports = returnSecurity
