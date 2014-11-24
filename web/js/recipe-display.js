(function(){
    app = angular.module('recipe-display', []);

    app.controller('RecipeDisplayController', function($scope, $http) {
        var self = this;

        self.formattedTabNum = 1;
        self.rawTabNum       = 2;

        // Defaults
        self.tab      = 2;
        self.recipeID = 1;
        self.editing  = false;

        self.selectTab  = function(tabNum) { self.tab = tabNum;          };
        self.isSelected = function(tabNum) { return self.tab === tabNum; };

        self.recipe = function() {
            return $scope.allRecipes[self.recipeID];
        };

        self.hasFormattedRecipe = function() {
            return self.recipeJSON().recipeSteps != null  && self.recipeJSON().recipeSteps.length > 0
                ? true
                : false;
        };

        self.rawRecipe = function() {
            return self.recipe().recipe_raw;
        };

        self.recipeName = function() {
            return self.recipe().recipe_name;
        };

        self.recipeJSON = function() {
            return self.recipe().recipe_json || {};
        };

        self.stepRecipe = function(step) {

            var newID = self.recipeID + step;

            if(newID >= $scope.allRecipes.length) {
                newID = 1;
            }
            if(newID < 1) {
                newID = $scope.allRecipes.length - 1;
            }

            self.recipeID = newID;
            self.selectAppropriateInitialTab();

            self.destroyEditForm();
            self.editing = false;
        };

        self.prevRecipe = function() { self.stepRecipe(-1); };
        self.nextRecipe = function() { self.stepRecipe(1);  };

        self.selectAppropriateInitialTab = function() {
            if(self.hasFormattedRecipe()) {
                console.log("FORMATTED");
                self.tab = self.formattedTabNum;
            } else {
                self.tab = self.rawTabNum;
            }
        };

        self.initializeEditForm = function() {
            $http.get('http://zolan.org:6622/editFormOptions').success(function(retval) {
                self.editFormOptions = retval.data

                var recipeName     = self.recipeName();
                var recipeJSON     = self.recipeJSON();
                var recipeSkeleton = { recipeName: recipeName, recipeSteps: [], credit: '' };

                var recipeStartVal = self.hasFormattedRecipe()
                    ? recipeJSON
                    : recipeSkeleton;

                recipeStartVal = angular.copy(recipeStartVal);
                self.editFormOptions.startval = recipeStartVal;

                var element = document.getElementById('edit-form');
                self.recipeEditor = new JSONEditor(element, self.editFormOptions);
                self.recipeEditor.on('change', function() {
                    var values = self.recipeEditor.getValue();
                });
            }).error(function(data,status,headers,config) {
                console.log("ERROR!", data,status,headers,config);
            });
        };

        self.destroyEditForm = function() {
            if(self.recipeEditor != null) {
                self.recipeEditor.destroy();
            }
        };

        self.editRecipe = function() {
            self.editing = !self.editing;

            if(self.editing) {
                self.initializeEditForm();
            } else {
                self.destroyEditForm();
            }
        };

        self.updateRecipe = function() {
            var recipeJSON = angular.copy(self.recipeEditor.getValue());
            var recipeName = recipeJSON.recipeName;

            var data = {
                recipeName: recipeName,
                recipeJSON: recipeJSON
            };

            $http.put('http://zolan.org:6622/recipes/' + self.recipeID, data).success(function(){ console.log("SUCCESS!") }).error(function() {
                console.log("ERROR!", data,status,headers,config);
            })
        }

        self.isEditing = function() {
            return self.editing;
        };
    });

    app.directive("editRecipe", function() {
        return {
            restrict: 'E',
            templateUrl: 'partials/edit-recipe.html'
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

    app.directive("navRecipe", function() {
        return {
            restrict: 'E',
            templateUrl: 'partials/nav-recipe.html'
        };
    });

})();
