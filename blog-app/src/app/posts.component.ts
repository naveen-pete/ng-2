import { Component, OnInit } from '@angular/core';

import { UserService } from './user.service';
import { PostService } from './post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styles: [`
      .posts li { cursor: default; }
      .posts li:hover { background: #ecf0f1; } 
      .list-group-item.active, 
      .list-group-item.active:hover, 
      .list-group-item.active:focus { 
          background-color: #ecf0f1;
          border-color: #ecf0f1; 
          color: #2c3e50;
      }
  `]
})
export class PostsComponent implements OnInit {
  postsLoading;
  commentsLoading;
  
  users = [];
  posts = [];

  currentPost;

  constructor(
        private _postService: PostService, 
        private _userService: UserService
  ) {}

  ngOnInit() {
    this.loadUsers();
    this.loadPosts();
  }

  private loadUsers() {
    console.log('Calling UserService.getUsers()..');
    this._userService.getUsers()
      .subscribe(
        result => {
          console.info('Users retrieved successfully!');
          this.users = result;
        },
        error => {
          console.error('Error occurred while retrieving users.');
          console.error('error:', error);
        }
      );
  }

  private loadPosts(filter?) {
    this.postsLoading = true;

    console.log('Calling PostService.getPosts()..');
    this._postService.getPosts(filter)
      .subscribe(
        result => {
          console.info('Posts retrieved successfully!');
          this.posts = result;
        },
        error => {
          console.error('Error occurred while retrieving posts.');
          console.error('error:', error);
        },
        () => this.postsLoading = false
      );
  }

  select(post) {
    this.currentPost = post;

    this.commentsLoading = true;
    console.log('Calling PostService.getComments()..');
    this._postService.getComments(post.id)
      .subscribe(
        result => {
          console.info('Comments for post id ' + post.id + ' retrieved successfully!');
          this.currentPost.comments = result;
        },
        error => {
          console.error('Error occurred while retrieving comments for post id ', post.id);
          console.error('error:', error);
        },
        () => this.commentsLoading = false
      );
  }

  reloadPosts(filter) {
    this.currentPost = null;

    this.loadPosts(filter);
  }
}
