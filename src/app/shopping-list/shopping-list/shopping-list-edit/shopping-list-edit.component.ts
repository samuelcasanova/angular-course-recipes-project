import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'

import { Ingredient } from '../../../common/ingredient.model'
import { ShoppingListService } from '../../shopping.list.service'
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrl: './shopping-list-edit.component.css'
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild('nameInput') nameInput: ElementRef<HTMLInputElement>
  @ViewChild('quantityInput') quantityInput: ElementRef<HTMLInputElement>
  @ViewChild('shoppingListForm') shoppingListForm: NgForm
  
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.shoppingListService.editIngredientSubject.subscribe((ingredient) => this.onEditIngredient(ingredient))
  }
  
  onSubmit() {
    const { name, quantity } = this.shoppingListForm.value
    const ingredient = new Ingredient(name, quantity)
    this.shoppingListService.addIngredient(ingredient)
  }

  onEditIngredient(ingredient: Ingredient) {
    this.shoppingListForm.form.patchValue(ingredient)
  }
}
