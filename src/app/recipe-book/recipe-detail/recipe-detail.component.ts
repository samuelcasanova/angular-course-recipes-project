import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent {
  recipe: Recipe | null = null
  constructor(private recipeService: RecipeService) {
    this.recipeService.subscribeToSelectRecipe((selectedRecipe: Recipe) => {
      this.recipe = selectedRecipe
    })
  }

  onToShoppingList() {
    this.recipeService.recipeIngredientsToShoppingList(this.recipe)
  }    
}
