import { NgModule } from "@angular/core";
import { authGuard } from "../auth/auth.guard";
import { EmptyRecipeDetailComponent } from "./empty-recipe-detail/empty-recipe-detail.component";
import { RecipeBookComponent } from "./recipe-book.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeResolver } from "./recipe-resolver.service";
import { RouterModule } from "@angular/router";

const routes = [
  { 
    path: 'recipes', component: RecipeBookComponent, canActivate: [ authGuard ], children: [
      { path: '', component: EmptyRecipeDetailComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: ':index', component: RecipeDetailComponent, resolve: { recipe: RecipeResolver } },
      { path: ':index/edit', component: RecipeEditComponent, resolve: { recipe: RecipeResolver } }
    ] 
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeBookRoutingModule {}