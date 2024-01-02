import { Subject } from "rxjs";

import { Ingredient } from "../common/ingredient.model";
export class ShoppingListService {
  editIngredientSubject = new Subject<number>()
  shoppingListSubject = new Subject<Ingredient[]>()
  
  private ingredients: Ingredient[]
  
  constructor() {
    this.ingredients = [
      new Ingredient('Apples', 5),
      new Ingredient('Pears', 8),
      new Ingredient('Bananas', 10)
    ]
  }
  
  getIngredients(): Ingredient[] {
    return [...this.ingredients]
  }
  
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient)
    this.shoppingListSubject.next(this.getIngredients())
  }
  
  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients)
    this.shoppingListSubject.next(this.getIngredients())
  }
  
  getIngredient(index: number) {
    return this.ingredients[index]
  }

  updateIngredient(editedIngredientIndex: number, ingredient: Ingredient) {
    this.ingredients = [
      ...this.ingredients.slice(0, editedIngredientIndex),
      ingredient,
      ...editedIngredientIndex < this.ingredients.length - 1 ? this.ingredients.slice(editedIngredientIndex + 1) : []
    ]
    this.shoppingListSubject.next(this.getIngredients())
  } 
}