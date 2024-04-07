import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[]
  private shoppingListSubscription: Subscription
  
  constructor(private shoppingListService: ShoppingListService) {}
  
  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients()
    this.shoppingListSubscription = this.shoppingListService.shoppingListSubject.subscribe((ingredients) => {
      this.ingredients = ingredients
    })
  }

  ngOnDestroy(): void {
    this.shoppingListSubscription?.unsubscribe()
  }

  onEditIngredient(index: number) {
    this.shoppingListService.editIngredientSubject.next(index)
  }
}
