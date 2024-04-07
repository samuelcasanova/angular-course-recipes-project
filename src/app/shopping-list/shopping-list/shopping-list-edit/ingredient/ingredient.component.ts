import { Component, Input } from '@angular/core';
import { Ingredient } from '../../../../shared/ingredient.model';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html'
})
export class IngredientComponent {
  @Input() ingredient: Ingredient
}
