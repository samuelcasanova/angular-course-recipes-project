import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit{
  recipe: Recipe | null = null
  index: number
  
  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.index = +params['index']
      this.recipe = this.recipeService.getRecipe(this.index)
    })
  }

  onToShoppingList() {
    this.recipeService.recipeIngredientsToShoppingList(this.recipe)
  }    

  onDelete() {
    this.recipeService.deleteRecipe(this.index)
    this.router.navigate(['..'], { relativeTo: this.route })
  }
}
