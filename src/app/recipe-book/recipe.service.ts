import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";

export class RecipeService {
  private recipes: Recipe[]
  public recipeSelected: EventEmitter<Recipe>

  constructor() {
    this.recipes = [
      new Recipe('Mac and Cheese', 'Pasta delicatessen', 'https://www.allrecipes.com/thmb/e8uotDI18ieXNBY0KpmtGKbxMRM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/238691-Simple-Macaroni-And-Cheese-mfs_008-4x3-6ed91ba87a1344558aacc0f9ef0f4b41.jpg'),
      new Recipe('Supreme Hot Dog', 'Fast Food', 'https://www.yeoldeoak.co.uk/wp-content/uploads/2020/03/CLASSIC-HOT-DOG.jpg'),
      new Recipe('Pizza', 'Italian desire', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pizza-3007395.jpg/800px-Pizza-3007395.jpg')
    ]
    this.recipeSelected = new EventEmitter<Recipe>()
  }

  getRecipes() {
    return [...this.recipes]
  }

  selectRecipe(recipe: Recipe) {
    this.recipeSelected.emit(recipe)
  }

  subscribeToSelectRecipe(subscriber: (recipe: Recipe) => void) {
    this.recipeSelected.subscribe(subscriber)
  }
}