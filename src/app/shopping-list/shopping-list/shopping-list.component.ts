import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../common/ingredient.model';
import { ShoppingListService } from '../shopping.list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[]

  constructor(private shoppingListService: ShoppingListService) {
  }
  
  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients()
    this.shoppingListService.shoppingListUpdated.subscribe((ingredients) => {
      this.ingredients = ingredients
    })
  }
}
