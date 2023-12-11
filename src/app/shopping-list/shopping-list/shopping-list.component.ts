import { Component } from '@angular/core';
import { Ingredient } from '../../common/ingredient.model';
import { ShoppingListService } from '../shopping.list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
  providers: [ShoppingListService]
})
export class ShoppingListComponent {
  ingredients: Ingredient[]

  constructor(private shoppingListService: ShoppingListService) {
    this.ingredients = this.shoppingListService.ingredients
  }
}
