function recipeAppClass (express, db) {
    var self = this

    self.express = express
    self.db      = db

    self.cache   = {}
}

recipeAppClass.prototype.cacheQueryResults = function(query, cacheKey, next) {
    var self = this

    self.cache[cacheKey] = []

    self.db.serialize(function() {
        self.db.all('select * from recipes', function(err, rows) {
            self.cache[cacheKey] = rows
            next()
        })
    })
}

recipeAppClass.prototype.refreshRecipe = function(recipeID) {
    var self         = this

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

    full_query = [query, filter].join(' where ')

    return function(req, res, next) {
        self.cacheQueryResults(full_query, cacheKey, next)
    }
}

recipeAppClass.prototype.sendRecipeByCacheKey = function(cacheKey) {
    var self = this

    return function (req, res) {
        res.send(self.cache[cacheKey])
    }
}

module.exports = recipeAppClass
