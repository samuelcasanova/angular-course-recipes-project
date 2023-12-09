import { Component } from "@angular/core";
import { Recipe } from "./recipe.model";

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html'
})
export class RecipeBookComponent {
  selectedRecipe: Recipe | null = null

  selectRecipe(recipe: Recipe) {
    this.selectedRecipe = recipe
  }
}