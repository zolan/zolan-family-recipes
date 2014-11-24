(function(){
    app = angular.module('familyRecipes', ['recipe-display']);

    app.controller('FamilyRecipesAppController', function($http, $scope) {
        var self = this;

        this.refreshAllRecipes = function() {
            $http.get('http://zolan.org:6622/recipes/all').success(function(retval) {
                if(retval.status == 'success') {
                    $scope.allRecipes = [null].concat(retval.data);
                } else if(retval.status == 'failure') {
                    console.log("Got an error!\n", retval.data);
                } else {
                    console.log("Got a weird state!!!");
                }
            }).error(function(data,status,headers,config) {
                console.log("ERROR!", data,status,headers,config);
            });
        };

        // Default allRecipes so there is at least something there prior to getting the data from the api.
        $scope.allRecipes = [ null, {recipeID: 1, recipe_name: 'Loading...', recipe_raw: '', recipe_json: {} }];

        // Immediately grab all recipes.
        this.refreshAllRecipes();
    });

})();
