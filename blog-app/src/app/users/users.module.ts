import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { UsersComponent }   from './users.component';
import { UserFormComponent } from './user-form.component';
import { UserService } from './user.service';
import { UnsavedChangesGuardService } from '../shared/unsaved-changes-guard.service';

@NgModule({
    imports: [ 
        CommonModule, 
        RouterModule, 
        ReactiveFormsModule, 
        SharedModule 
    ],
    exports: [ UsersComponent, UserFormComponent ],
    declarations: [ UsersComponent, UserFormComponent ],
    providers: [ UnsavedChangesGuardService ],
})
export class UsersModule { }
