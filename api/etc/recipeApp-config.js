var configReturner = function(basedir) {
    return {
        logFile:     basedir + '/var/log/recipeApp.log',
        logCategory: 'recipeApp',
        db: {
            database: 'family_recipes',
            username: null,
            password: null,
            sequelizeParams: {
                dialect: 'sqlite',
                storage: basedir + '/var/data/family_recipes.sqlite',
                logging: false
            }
        }
    }
}

module.exports = configReturner
