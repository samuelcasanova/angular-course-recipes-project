import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe
  isSelected: boolean

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const index = +params['index']
      this.isSelected = index === this.getIndex()
    })
  }

  onRecipeSelected() {
    const selectedIndex = this.getIndex()
    this.router.navigate([selectedIndex], { relativeTo: this.route })
  }

  private getIndex(): number {
    const recipes = this.recipeService.getRecipes();
    return recipes.indexOf(this.recipe) ?? 0
  }
}
