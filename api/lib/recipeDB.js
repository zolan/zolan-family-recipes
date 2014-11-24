var Sequelize = require('sequelize')

function recipeDBClass () {
    var self = this

    var basedir = __dirname + '/..';

    self.config = require(basedir + '/etc/recipeApp-config')(basedir)

    self.sequelize = new Sequelize(
        self.config.db.database,
        self.config.db.username,
        self.config.db.password,
        self.config.db.sequelizeParams
    );

    self.defineModels()

    self.query = self.sequelize.query
    return self
}


recipeDBClass.prototype = {
    defineModels: function() {
        var self = this

        self.defineRecipeModel()
    },

    defineRecipeModel: function() {
        var self = this;

        self.recipe = self.sequelize.define('recipes', {
            recipe_id:   { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
            recipe_name: { type: Sequelize.TEXT,    allowNull: false },
            recipe_raw:  { type: Sequelize.TEXT,    allowNull: false },
            recipe_json: {
                type:      Sequelize.TEXT,
                allowNull: false,

                get: function() {
                    var stringifiedJSON   = this.getDataValue('recipe_json')
                    var unstringifiedJSON = JSON.parse(stringifiedJSON)
                    if(unstringifiedJSON && unstringifiedJSON.recipeSections != null) {
                        unstringifiedJSON.recipeSteps = unstringifiedJSON.recipeSections
                        delete unstringifiedJSON.recipeSections
                    }
                    return unstringifiedJSON
                },
                set: function(value) {
                    var stringifiedJSON = JSON.stringify(value)
                    this.setDataValue('recipe_json', stringifiedJSON)
                }
            }
        }, {
            timestamps: false
        })
    }
}

module.exports = new recipeDBClass()
