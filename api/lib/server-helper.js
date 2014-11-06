var returnServerHelper = function(serverConfig) { return {
    showBanner: function(req, res) { res.send(serverConfig.banner) },
} }

module.exports = returnServerHelper
