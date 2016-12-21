import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar.component';
import { HomeComponent } from './home.component';
import { UnsavedChangesGuardService } from './unsaved-changes-guard.service';
import { NotFoundComponent } from './not-found.component';

import { UsersComponent } from './users/users.component';
import { UserService } from './users/user.service';
import { UserFormComponent } from './users/user-form.component';

import { PostsComponent } from './posts/posts.component';
import { PostService } from './posts/post.service';
import { SpinnerComponent } from './shared/spinner.component';
import { PaginationComponent } from './shared/pagination.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    UsersComponent,
    PostsComponent,
    UserFormComponent,
    NotFoundComponent,
    SpinnerComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpModule,
    AppRouting
  ],
  providers: [UserService, UnsavedChangesGuardService, PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
