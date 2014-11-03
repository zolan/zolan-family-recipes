(function(){
    app = angular.module('recipe-display', []);

    app.controller('RecipeDisplayController', function($scope) {

        this.tab = 2;
        this.recipeID   = 0;

        this.selectTab  = function(tabNum) { this.tab = tabNum;          };
        this.isSelected = function(tabNum) { return this.tab === tabNum; };

        this.recipeName = $scope.allRecipes[this.recipeID].recipe_name;

        this.stepRecipe = function(step) {

            var newID = this.recipeID + step;

            if(newID >= $scope.allRecipes.length) {
                newID = 0;
            }
            if(newID < 0) {
                newID = $scope.allRecipes.length - 1;
            }

            this.recipeID = newID;
            this.recipeName = $scope.allRecipes[this.recipeID].recipe_name; 
        };

        this.prevRecipe = function() { this.stepRecipe(-1); };
        this.nextRecipe = function() { this.stepRecipe(1);  };

        this.showRawRecipe = function() {
            return $scope.allRecipes[this.recipeID].recipe_raw;
        };

    });

    app.directive("formattedRecipe", function() {
        return {
            restrict: 'E',
            templateUrl: 'partials/formatted-recipe.html'
        };
    });

    app.directive("rawRecipe", function() {
        return {
            restrict: 'E',
            templateUrl: 'partials/raw-recipe.html'
        };
    });

    app.directive("navRecipeView", function() {
        return {
            restrict: 'E',
            templateUrl: 'partials/nav-recipe-view.html'
        };
    });

    app.directive("navRecipePager", function() {
        return {
            restrict: 'E',
            templateUrl: 'partials/nav-recipe-pager.html'
        };
    });

})();
