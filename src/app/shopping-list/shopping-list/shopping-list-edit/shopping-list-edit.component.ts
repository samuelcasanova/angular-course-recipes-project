import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../../common/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrl: './shopping-list-edit.component.css'
})
export class ShoppingListEditComponent {
  @ViewChild('nameInput') nameInput: ElementRef<HTMLInputElement>
  @ViewChild('quantityInput') quantityInput: ElementRef<HTMLInputElement>

  @Output() ingredientAdded = new EventEmitter<Ingredient>()

  onIngredientAdded() {
    const name = this.nameInput.nativeElement.value
    const quantity = parseInt(this.quantityInput.nativeElement.value)
    const ingredient = new Ingredient(name, quantity)
    this.ingredientAdded.emit(ingredient)
  }
}
