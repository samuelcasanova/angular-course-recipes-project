import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list/shopping-list/shopping-list.component";
import { RecipeBookComponent } from "./recipe-book/recipe-book.component";
import { RecipeDetailComponent } from "./recipe-book/recipe-detail/recipe-detail.component";
import { EmptyRecipeDetailComponent } from "./recipe-book/empty-recipe-detail/empty-recipe-detail.component";
import { RecipeEditComponent } from "./recipe-book/recipe-edit/recipe-edit.component";
import { RecipeResolver } from "./recipe-book/recipe-resolver.service";

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', component: RecipeBookComponent, children: [
    { path: '', component: EmptyRecipeDetailComponent },
    { path: 'new', component: RecipeEditComponent },
    { path: ':index', component: RecipeDetailComponent, resolve: { recipe: RecipeResolver } },
    { path: ':index/edit', component: RecipeEditComponent, resolve: { recipe: RecipeResolver } }
  ] },
  { path: 'shopping-list', component: ShoppingListComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}