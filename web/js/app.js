(function(){

    app = angular.module('familyRecipes', ['recipe-display']);

    app.controller('FamilyRecipesAppController', function($http, $scope) {
        var self = this;

        $scope.allRecipes = [ {recipeID: 0, recipe_name: 'Loading...', recipe_raw: '', recipe_json: {} }];

        $http.get('http://zolan.org:6622/allRecipes').success(function(data) {
            console.log(data)
            $scope.allRecipes = data
        })

        this.recipeID = 0;
        this.recipeName = $scope.allRecipes[this.recipeID].recipe_name;
        this.prevRecipe = function() { this.recipeID = this.recipeID - 1; this.recipeName = $scope.allRecipes[this.recipeID].recipe_name;  }
        this.nextRecipe = function() { this.recipeID = this.recipeID + 1; this.recipeName = $scope.allRecipes[this.recipeID].recipe_name;  }

        this.showRawRecipe = function() {
            return $scope.allRecipes[this.recipeID].recipe_raw;
        };

    });

})();
