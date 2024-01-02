import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { Subscription } from 'rxjs'
import { NgForm } from '@angular/forms'

import { Ingredient } from '../../../common/ingredient.model'
import { ShoppingListService } from '../../shopping.list.service'

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrl: './shopping-list-edit.component.css'
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('nameInput') nameInput: ElementRef<HTMLInputElement>
  @ViewChild('quantityInput') quantityInput: ElementRef<HTMLInputElement>
  @ViewChild('shoppingListForm') shoppingListForm: NgForm
  editIngredientSubscription: Subscription
  editMode: boolean = false
  editedIngredientIndex: number | null = null
  
  constructor(private shoppingListService: ShoppingListService) {}
  
  ngOnInit(): void {
    this.shoppingListService.editIngredientSubject.subscribe((index) => this.onEditIngredient(index))
  }
  
  ngOnDestroy(): void {
    this.shoppingListService.editIngredientSubject.unsubscribe()
  }

  onSubmit() {
    const { name, quantity } = this.shoppingListForm.value
    const ingredient = new Ingredient(name, quantity)
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedIngredientIndex, ingredient)
    } else {
      this.shoppingListService.addIngredient(ingredient)
    }
  }

  onEditIngredient(index: number) {
    const ingredient = this.shoppingListService.getIngredient(index)
    this.shoppingListForm.form.patchValue(ingredient)
    this.editMode = true
    this.editedIngredientIndex = index
  }
}
