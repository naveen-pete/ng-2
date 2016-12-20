import { RouterModule } from '@angular/router';

import { UserFormComponent } from './user-form.component';
import { UsersComponent } from './users.component';
import { PostsComponent } from './posts.component';
import { HomeComponent } from './home.component';
import { NotFoundComponent } from './not-found.component';
import { UnsavedChangesGuardService } from './unsaved-changes-guard.service';

export const AppRouting = RouterModule.forRoot([
    { path: 'users/new', component: UserFormComponent, canDeactivate: [UnsavedChangesGuardService] },
    { path: 'users/:id', component: UserFormComponent, canDeactivate: [UnsavedChangesGuardService] },
    { path: 'users', component: UsersComponent },
    { path: 'posts', component: PostsComponent },
    { path: 'notfound', component: NotFoundComponent },
    { path: '', component: HomeComponent },
    { path: '**', redirectTo: '/' }
]);
