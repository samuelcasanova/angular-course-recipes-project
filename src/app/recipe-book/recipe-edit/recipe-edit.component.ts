import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})

export class RecipeEditComponent implements OnInit {
  index: number | null = null
  recipe: Recipe | null = null
  editMode: boolean = false
  mode: 'edit' | 'new' = 'new'
  recipeForm: FormGroup
  
  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.editMode = !!params['index'] 
      this.index = +params['index']
      this.recipe = this.recipeService.getRecipe(this.index)
      this.initForm()
    })
    this.initForm()
  }
  
  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.index, this.recipeForm.value)
    } else {
      this.recipeService.addRecipe(this.recipeForm.value)
    }
    this.router.navigate(['..'], { relativeTo: this.route })
  }
  
  onCancel() {
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(this.getIngredientFormGroup(null, null))
  }

  onDeleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index)
  }

  private initForm() {
    const name = this.editMode ? this.recipe.name : ''
    const description = this.editMode ? this.recipe.description : ''
    const imagePath = this.editMode ? this.recipe.imagePath : ''
    const ingredientControls = this.editMode ? this.recipe.ingredients.map(i => this.getIngredientFormGroup(i.name, i.quantity)) : []

    this.recipeForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      description: new FormControl(description, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      ingredients: new FormArray(ingredientControls)
    })
  }

  private getIngredientFormGroup(name: string | null, quantity: number | null) {
    return new FormGroup({
      name: new FormControl(name, Validators.required),
      quantity: new FormControl(quantity, Validators.min(1))
    })
  }
}
