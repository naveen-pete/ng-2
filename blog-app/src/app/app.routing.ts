import { RouterModule } from '@angular/router';

import { UserFormComponent } from './user-form.component';
import { UsersComponent } from './users.component';
import { PostsComponent } from './posts.component';
import { HomeComponent } from './home.component';

export const AppRouting = RouterModule.forRoot([
    { path: 'users/new', component: UserFormComponent },
    { path: 'users', component: UsersComponent },
    { path: 'posts', component: PostsComponent },
    { path: '', component: HomeComponent },
    { path: '**', redirectTo: '/' }
]);
