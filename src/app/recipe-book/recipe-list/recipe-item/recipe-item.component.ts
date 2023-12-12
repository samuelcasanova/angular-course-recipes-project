import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe
  isSelected: boolean

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.subscribeToSelectRecipe((selectedRecipe: Recipe) => {
      this.isSelected = this.recipe.name === selectedRecipe.name
    })
  }

  onRecipeSelected() {
    this.recipeService.selectRecipe(this.recipe)
  }
}
