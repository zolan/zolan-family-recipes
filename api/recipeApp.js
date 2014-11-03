function recipeAppClass (express, db) {
    var self = this

    self.express = express
    self.db      = db

    self.cache   = {}
}

recipeAppClass.prototype.allRecipesHandler = function(req, res, next) {
    var self = this

    self.cacheQueryResults('select * from recipes', 'allRecipes', next)
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

module.exports = recipeAppClass
