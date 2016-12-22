import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { SharedModule } from './shared/shared.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';

import { appRouting } from './app.routing';
import { usersRouting } from './users/users.routing';
import { postsRouting } from './posts/posts.routing';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar.component';
import { HomeComponent } from './home.component';

import { UserService } from './users/user.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule, 
    SharedModule, 
    UsersModule,
    PostsModule,
    usersRouting,
    postsRouting,
    appRouting
  ],
  providers: [ UserService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
