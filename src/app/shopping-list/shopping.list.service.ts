import { EventEmitter } from "@angular/core";
import { Ingredient } from "../common/ingredient.model";

export class ShoppingListService {
  
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
    this.shoppingListUpdated.emit([...this.ingredients])
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients)
    this.shoppingListUpdated.emit([...this.ingredients])
  }

  shoppingListUpdated = new EventEmitter<Ingredient[]>()
}