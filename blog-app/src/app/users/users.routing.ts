import { RouterModule } from '@angular/router';

import { UserFormComponent } from './user-form.component';
import { UsersComponent } from './users.component';
import { UnsavedChangesGuardService } from '../shared/unsaved-changes-guard.service';

export const usersRouting = RouterModule.forChild([
    { path: 'users/new', component: UserFormComponent, canDeactivate: [UnsavedChangesGuardService] },
    { path: 'users/:id', component: UserFormComponent, canDeactivate: [UnsavedChangesGuardService] },
    { path: 'users', component: UsersComponent },
]);