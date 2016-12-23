import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

const RECIPE_ROUTES: Routes = [
    { path: '', component: RecipesComponent, children: [
        { path: 'new', component: RecipeEditComponent },
        { path: ':id', component: RecipeDetailComponent },
        { path: ':id/edit', component: RecipeEditComponent },
        { path: '', component: RecipeStartComponent }
    ] }
];

export const recipesRouting = RouterModule.forChild(RECIPE_ROUTES);
