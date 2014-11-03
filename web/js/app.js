(function(){

    app = angular.module('familyRecipes', ['recipe-display']);

    app.controller('FamilyRecipesAppController', function() {

        this.allRecipes = [
            {
              recipe_name: "100.00_fudge_recipe",
              recipe_raw: "$ 100.00 FUDGE RECIPE\n\n3 pkgs chocolate chips\n1/2 lb marshmallows\n2 cups chopped Walnuts\n\nPut above ingredients in a large bowl and set aside.\n\nIn a sauce pan combine:\n\n4 1/2 cups sugar\n1 large can milk\n1/2 lb margarine or butter\n\nBoil this mixture for six minutes after it has come to a rolling boil. Then pour into above ingredients and stir until chocolate and marshmallows are dissolved.\n\nRecipe given to Myrt McLean",
              recipe_json: {}
            },

            {
              recipe_name: "2_minute_microwave_fudge",
              recipe_raw: "2 MINUTE MICROWAVE FUDGE\n\n1 box powdered sugar\n1/2 cup cocoa\n1/4 tsp salt\n1/4 cup milk\n1 tablespoons vanilla\n1/2 cup butter\n\nPut the above ingredients in a microwave bowl stirring dry ingredients together.  Add milk, vanilla and stir.  By spoonfuls dot top with butter.  Put in microwave and cook on high for 2 minutes.  Stir and put into a greased dish.  Sifted powdered sugar works better.\n\nRecipe given to Cindy kilpatrick by Linda DeBord",
              recipe_json: {}
            },

            {
              recipe_name: "abstract_apple_cuts",
              recipe_raw: "ABSTRACT APPLE CUTS\n\n1/2 tsp salt\n2 1/2 cups flour\n1 cup shortening\n\nMix as for pie crust.\n\nPut egg yolk in measuring cup, fill to 2/3 cup with milk.  Beat this lightly then add to above mixture.\n\nRoll 1/2 of mixture on floured board then fit onto a jelly roll pan.  This will be a thin dough.  Sprinkle 2 to 3 handsfull of cornflakes, wheaties, or special K on top.\n\nSlice 8 to 10 apples over cornflakes.  Add 1 cup sugar and sprinkle with cinnamon and dot with butter.  Just as you would for an apple pie.  Roll out top crust and place over top and seal sides. \n\nBeat 1 egg white stiffly and spread over top and bake at 400 degrees for about 1 hour.  While still hot drip this mixture over the top:\n\n1 cup powdered sugar\n1/2 tsp vanilla\nmilk\n\nMix dough and let set until you have peeled and cored the apples. This will make dough easier to work with.\n\nRecipe given to Lila McLean by Barb Hinger",
              recipe_json: {}
            },

            {
              recipe_name: "amazing_raisin_cake",
              recipe_raw: "AMAZING RAISIN CAKE\n\n3 cups unsifted flour\n2 cups sugar\n1 cup real mayonnaise\n1/3 cup milk\n2 eggs\n2 tsp baking soda\n1 1/2 tsp ground cinnamon\n1/2 tsp ground nutmeg\n1/2 tsp salt\n1/4 tsp ground cloves\n3 cups chopped peeled apples\n1 cup seedless raisins\n1/2 cup coarsely chopped walnuts\nGrease and flour 2 (9) inch round baking pans.  In a large bowl with a mixer at low speed beat first 10 ingredients 2 minutes, scraping bowl frequently (batter will be very thick).  With a spoon stir in apples, raisins, and nuts.  Spoon batter into pans.  Bake at 350 degrees for 45 minutes or until tester inserted in center of cake comes out clean.  Cool pans for 10 minutes.  Remove to wire rack and cool completely.  Chill and frost with whipped cream.\nWhen you're in the mood for something other than chocolate.  Not often, but sometimes.\nFrom the kitchen of Renee Ollie",
              recipe_json: {}
            },

            {
              recipe_name: "amish_sugar_cookies",
              recipe_raw: "AMISH SUGAR COOKIES\n\n1 cup sugar\n1 cup powdered sugar\n1 cup margarine or butter\n1 cup oil\n2 eggs\n5 cups flour\n1 tsp soda\n1 tsp cream of tarter\n1 tsp vanilla\n1/2 tsp almond extract (opt)\n\nCream sugar, butter, and oil together.  Add eggs, mix well.  Add dry ingredients and flavoring.  Chill dough several hours.  Roll dough with palms of hands into balls about the size of walnuts.  Press down with fork dipped in flour.  Place on ungreased cookie sheet.  Bake at 375 degrees for about 10 minutes.\n\nFrom the kitchen of Lila McLean",
              recipe_json: {}
            }
        ];

        this.recipeID = 0;
        this.recipeName = this.allRecipes[this.recipeID].recipe_name;
        this.prevRecipe = function() { this.recipeID = this.recipeID - 1; this.recipeName = this.allRecipes[this.recipeID].recipe_name;  }
        this.nextRecipe = function() { this.recipeID = this.recipeID + 1; this.recipeName = this.allRecipes[this.recipeID].recipe_name;  }

        this.showRawRecipe = function() {
            return this.allRecipes[this.recipeID].recipe_raw;
        };

    });

})();
