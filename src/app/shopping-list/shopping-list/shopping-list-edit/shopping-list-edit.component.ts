import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../../common/ingredient.model';
import { ShoppingListService } from '../../shopping.list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrl: './shopping-list-edit.component.css'
})
export class ShoppingListEditComponent {
  @ViewChild('nameInput') nameInput: ElementRef<HTMLInputElement>
  @ViewChild('quantityInput') quantityInput: ElementRef<HTMLInputElement>

  constructor(private shoppingListService: ShoppingListService) {}

  addIngredient() {
    const name = this.nameInput.nativeElement.value
    const quantity = parseInt(this.quantityInput.nativeElement.value)
    const ingredient = new Ingredient(name, quantity)
    this.shoppingListService.addIngredient(ingredient)
  }
}
