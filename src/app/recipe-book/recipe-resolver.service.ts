import { inject } from "@angular/core";
import { DataStorageService } from "../common/data-storage.service";
import { ActivatedRouteSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";

export function RecipeResolver(route: ActivatedRouteSnapshot, _state): Promise<Recipe> {
  const dataStorageService = inject(DataStorageService)
  const index = +route.params['index']
  return new Promise(resolve => {
    dataStorageService.fetchData().subscribe(recipes => {
      const recipe = recipes[index]
      resolve(recipe)
    })
  })
}