import { Component } from '@angular/core';
import { Ingredient } from '../../common/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent {
  ingredients: Ingredient[]
  constructor() {
    this.ingredients = [
      new Ingredient('Apples', 5),
      new Ingredient('Bananas', 10)
    ]
  }

  onIngredientAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient)
  }
}
