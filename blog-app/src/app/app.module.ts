import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar.component';
import { HomeComponent } from './home.component';
import { UsersComponent } from './users.component';
import { PostsComponent } from './posts.component';
import { UserService } from './user.service';
import { UserFormComponent } from './user-form.component';
import { UnsavedChangesGuardService } from './unsaved-changes-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    UsersComponent,
    PostsComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpModule,
    AppRouting
  ],
  providers: [UserService, UnsavedChangesGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
