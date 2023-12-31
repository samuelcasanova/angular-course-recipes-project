import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[]
  private recipesSubscription: Subscription

  constructor(private recipeService: RecipeService) {}
  
  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes()
    this.recipesSubscription = this.recipeService.recipesSubject.subscribe(recipes => this.recipes = recipes)
  }

  ngOnDestroy(): void {
    this.recipesSubscription?.unsubscribe()
  }
}
