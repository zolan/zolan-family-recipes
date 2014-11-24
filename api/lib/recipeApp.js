function recipeAppClass () {
    var self = this

    basedir       = __dirname + '/..'
    self.basedir = basedir

    self.cache        = {}

    self.log4js       = require('log4js')
    self.async        = require('async')
    self.fs           = require('fs')

    self.config       = require(basedir + '/etc/recipeApp-config')(basedir)
    self.db           = require(basedir + '/lib/recipeDB')
    self.loggerConfig = require(basedir + '/etc/logger-config')(self.config.logFile, self.config.logCategory, false)
    self.logger       = require(basedir + '/lib/makeLogger')(self.log4js, self.loggerConfig, self.config.logCategory)

    self.logger.info('recipeApp initialized.')
}

recipeAppClass.prototype = {
    getRecipe: function(req, res) {
        var self = this

        functionSeries = [
            self._getRecipeIDFromRequest(req),
            self._getCacheKeyForRecipeID(),
            self._fetchAndCacheRecipes(),
            self._getDataFromCache()
        ]

        self.async.waterfall(
            functionSeries,
            function(err, recipes) {
                if (err) {
                    res.json( { status: 'failure', data: err     } )
                } else {
                    res.json( { status: 'success', data: recipes } )
                }
            }
        )
    },

    _getRecipeIDFromRequest: function(req) {
        var self = this;

        return function(callback) {
            var err      = null
            var recipeID = req.params.recipeID

            callback(err, recipeID)
        }
    },

    _getCacheKeyForRecipeID: function() {
        var self = this

        return function(recipeID, callback) {
            var err      = null
            var cacheKey = ''

            if(recipeID === 'all' || recipeID === null) {
                cacheKey = 'allRecipes'
            } else {
                cacheKey = 'recipeID:'    + recipeID
            }

            callback(err, recipeID, cacheKey)
        }
    },

    _fetchAndCacheRecipes: function() {
        var self = this

        return function(recipeID, cacheKey, callback) {
            var err = null

            self.cache[cacheKey] = []

            var whereObj;
            if(recipeID == 'all' || recipeID == null) {
                whereObj = ["1=1"]
            } else {
                whereObj = {recipe_id: recipeID}
            }

            self.logger.info("Retrieving recipe(s): " + recipeID)

            self.db.recipe.findAll({ where: whereObj}).success(function(recipes) {
                self.cache[cacheKey] = recipes

                callback(err, cacheKey)
            }).error(function(errors) {
                callback(errors, null)
            })
        }
    },

    _getDataFromCache: function() {
        var self = this

        return function(cacheKey, callback) {
            var err = null
            callback(err, self.cache[cacheKey])
        }
    },

    putRecipe: function(req, res, next) {
        var self = this

        var recipeID = req.params.recipeID

        functionSeries = [
            self._getRecipeIDFromRequest(req),
            self._getCacheKeyForRecipeID(),
            self._updateRecipeForRecipeID(req),
            self._getCacheKeyForRecipeID(),
            self._fetchAndCacheRecipes()
        ]

        self.async.waterfall(
            functionSeries,
            function(err, cacheKey) {
                if (err) {
                    res.json( { status: 'failure', data: err     } )
                    next()
                } else {
                    res.json( { status: 'success', data: 'Successfully updated ' + cacheKey } )
                    next()
                }
            }
        )
    },

    _updateRecipeForRecipeID: function(req) {
        var self = this
        return function(recipeID, cacheKey, callback) {
            var err = null

            self.logger.info("Retrieving recipe for update: " + recipeID)

            if(recipeID == 'all') {
                err = "You may not do a put on all."
                callback(err, recipeID)
            }

            var recipeJSON = req.body.recipeJSON
            var recipeName = req.body.recipeName

            if(recipeName == null || recipeJSON == null) {
                if(recipeJSON == null) {
                    err = 'Error with PUT: recipeJSON was not specified in the request.'
                } else {
                    err = 'Error with PUT: recipeName was not specified in the request.'
                }

                callback(err, recipeID)
            }

            self.db.recipe.find({where: { recipe_id: recipeID }}).success(function(recipe) {

                recipe.updateAttributes({
                    recipe_name: recipeName,
                    recipe_json: recipeJSON
                }).success(function() {
                    self.logger.info("Recipe successfully updated: " + recipeID)
                    callback(err, recipeID)
                }).error(function(error) {
                    callback(error, recipeID)
                })

            }).error(function(errors) {
                callback(errors, recipeID)
            })
        }
    },

    getEditFormOptions: function(req, res) {
        var self = this

        functionSeries = [
            self._getJSONFromFile(self.basedir + '/etc/edit-form-options.json'),
        ]

        self.async.waterfall(
            functionSeries,
            function(err, recipes) {
                if (err) {
                    res.json( { status: 'failure', data: err     } )
                } else {
                    res.json( { status: 'success', data: recipes } )
                }
            }
        )
    },

    _getJSONFromFile: function(filename, callback) {
        var self = this;

        return function(callback) {
            var err = null;
            var fileContents = self.fs.readFileSync(filename, 'utf8');
            callback(err, JSON.parse(fileContents));
        }
    }
}

module.exports = new recipeAppClass()
