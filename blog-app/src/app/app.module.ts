import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar.component';
import { HomeComponent } from './home.component';
import { UsersComponent } from './users.component';
import { PostsComponent } from './posts.component';
import { UserService } from './user.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    UsersComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRouting
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
