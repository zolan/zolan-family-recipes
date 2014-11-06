function recipeAppClass (db) {
    var self = this

    self.async = require('async')
    self.db    = db
    self.cache = {}
}

recipeAppClass.prototype.getRecipe = function(req, res)
{
    var self = this

    functionSeries = [
        self._getRecipeIDFromRequest(req),
        self._getQueryAndCacheKeyForRecipeID(),
        self._cacheResultsForQuery(),
        self._getDataFromCache()
    ]

    self.async.waterfall(
        functionSeries,
        function(err, recipes) {
            if (err) {
                res.send(err)
            } else {
                res.json(recipes)
            }
        }
    )
}

recipeAppClass.prototype._getRecipeIDFromRequest = function(req) {
    var self = this;

    return function(callback) {
        var err      = null
        var recipeID = req.params.recipeID

        callback(err, recipeID)
    }
}

recipeAppClass.prototype._getQueryAndCacheKeyForRecipeID = function() {
    var self = this

    return function(recipeID, callback) {
        var err      = null
        var query    = 'select * from recipes'
        var filter   = ''
        var cacheKey = ''

        if(recipeID === 'all' || recipeID === null) {
            filter   = '1 = 1'
            cacheKey = 'allRecipes'
        } else {
            filter   = 'recipe_id = ' + recipeID
            cacheKey = 'recipeID:'    + recipeID
        }

        fullQuery = [query, filter].join(' where ')

        callback(err, recipeID, fullQuery, cacheKey)
    }
}

recipeAppClass.prototype._cacheResultsForQuery = function() {
    var self = this

    return function(recipeID, fullQuery, cacheKey, callback) {
        var err = null

        self.cache[cacheKey] = []

        self.db.serialize(function() {
            self.db.all(fullQuery, function(dberr, rows) {
                if(dberr) {
                    err = {
                        message: "Error attempting to retrieve recipe ID [" + recipeID +"].",
                        dberr:   dberr
                    }
                }

                self.cache[cacheKey] = rows

                callback(err, cacheKey)
            })
        })
    }
}

recipeAppClass.prototype._getDataFromCache = function() {
    var self = this

    return function(cacheKey, callback) {
        var err = null
        callback(err, self.cache[cacheKey])
    }
}

module.exports = recipeAppClass
