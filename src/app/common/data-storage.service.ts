import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipe-book/recipe.service";
import { Recipe } from "../recipe-book/recipe.model";
import { map, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private httpClient: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes()
    this.httpClient.put('https://angular-course-recipes-f8081-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes)
      .subscribe(response => {
        console.log(response)
      })
  }

  fetchData() {
    return this.httpClient.get<Recipe[]>('https://angular-course-recipes-f8081-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
      .pipe(map(recipes => {
        return recipes.map(recipe => (new Recipe(recipe.name, recipe.description, recipe.imagePath, recipe.ingredients ?? [])))
      }),
      tap(recipes => {
        console.log(recipes)
        this.recipeService.updateRecipes(recipes)
      }))
  }
}