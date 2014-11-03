(function(){
    app = angular.module('familyRecipes', ['recipe-display']);

    app.controller('FamilyRecipesAppController', function($http, $scope) {
        var self = this;

        this.refreshAllRecipes = function() {
            $http.get('http://zolan.org:6622/allRecipes').success(function(data) {
                $scope.allRecipes = data
            })
        };

        // Default allRecipes so there is at least something there prior to getting the data from the api.
        $scope.allRecipes = [ {recipeID: 0, recipe_name: 'Loading...', recipe_raw: '', recipe_json: {} }];

        // Immediately grab all recipes.
        this.refreshAllRecipes();
    });

})();
