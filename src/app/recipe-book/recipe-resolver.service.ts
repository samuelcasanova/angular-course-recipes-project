import { inject } from "@angular/core";
import { DataStorageService } from "../common/data-storage.service";
import { ActivatedRouteSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

export function RecipeResolver(route: ActivatedRouteSnapshot, _state): Promise<Recipe> {
  const index = +route.params['index']
  const dataStorageService = inject(DataStorageService)
  const recipeService = inject(RecipeService)
  const recipes = recipeService.getRecipes()
  if (recipes.length > 0) {
    return Promise.resolve(recipes[index])
  }
  return new Promise(resolve => {
    dataStorageService.fetchData().subscribe(recipes => {
      const recipe = recipes[index]
      resolve(recipe)
    })
  })
}