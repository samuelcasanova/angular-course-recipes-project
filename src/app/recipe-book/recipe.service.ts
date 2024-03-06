import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Recipe } from "./recipe.model";
// import { Ingredient } from "../common/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping.list.service";

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private recipes: Recipe[]
  public recipesSubject: Subject<Recipe[]>

  constructor(private shoppingListService: ShoppingListService) {
    // this.recipes = [
    //   new Recipe(
    //     'Mac and Cheese', 
    //     'Pasta delicatessen', 
    //     'https://www.allrecipes.com/thmb/e8uotDI18ieXNBY0KpmtGKbxMRM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/238691-Simple-Macaroni-And-Cheese-mfs_008-4x3-6ed91ba87a1344558aacc0f9ef0f4b41.jpg',
    //     [ new Ingredient('Macarronni', 500), new Ingredient('Gouda Cheese', 100) ]
    //   ),
    //   new Recipe(
    //     'Supreme Hot Dog', 
    //     'Fast Food', 
    //     'https://www.yeoldeoak.co.uk/wp-content/uploads/2020/03/CLASSIC-HOT-DOG.jpg',
    //     [ new Ingredient('Sausage', 1), new Ingredient('Ketchup', 1), new Ingredient('Bread', 1)]
    //   ),
    //   new Recipe(
    //     'Pizza', 
    //     'Italian desire', 
    //     'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pizza-3007395.jpg/800px-Pizza-3007395.jpg',
    //     [ new Ingredient('Doug', 1), new Ingredient('Tomato', 1), new Ingredient('Mozzarella', 100)]
    //   )
    // ]
    this.recipes = []
    this.recipesSubject = new Subject()
  }

  addRecipe(recipe: Recipe) {
    this.recipes = [...this.recipes, recipe]
    this.recipesSubject.next(this.getRecipes())
  }

  updateRecipe(editedRecipeIndex: number, updatedRecipe: Recipe) {
    this.recipes = [
      ...this.recipes.slice(0, editedRecipeIndex),
      updatedRecipe,
      ...editedRecipeIndex < this.recipes.length - 1 ? this.recipes.slice(editedRecipeIndex + 1) : []
    ]
    this.recipesSubject.next(this.getRecipes())
  }

  updateRecipes(updatedRecipes: Recipe[]) {
    this.recipes = updatedRecipes
    this.recipesSubject.next(this.getRecipes())
  }

  deleteRecipe(deletedRecipeIndex: number) {
    this.recipes = [
      ...this.recipes.slice(0, deletedRecipeIndex),
      ...deletedRecipeIndex < this.recipes.length - 1 ? this.recipes.slice(deletedRecipeIndex + 1) : []
    ]
    this.recipesSubject.next(this.getRecipes())
  }

  getRecipes() {
    return [...this.recipes]
  }

  getRecipe(index: number) {
    const safeIndex = Math.min(index, this.recipes.length - 1);
    return this.recipes[safeIndex]
  }

  recipeIngredientsToShoppingList(recipe: Recipe) {
    this.shoppingListService.addIngredients(recipe.ingredients)
  }
}