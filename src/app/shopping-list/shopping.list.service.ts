import { Ingredient } from "../common/ingredient.model";

export class ShoppingListService {
  ingredients: Ingredient[]

  constructor() {
    this.ingredients = [
      new Ingredient('Apples', 5),
      new Ingredient('Pears', 8),
      new Ingredient('Bananas', 10)
    ]
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient)
  }
}