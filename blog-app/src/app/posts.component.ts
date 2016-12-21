import { Component, OnInit } from '@angular/core';

import { PostService } from './post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html'
})
export class PostsComponent implements OnInit {
  isLoading = true;
  posts = [];

  constructor(private _postService: PostService) {}

  ngOnInit() {
    console.log('Calling PostService.getPosts()..');
    this._postService.getPosts()
      .subscribe(
        result => {
          console.info('Posts retrieved successfully!');
          this.posts = result;
        },
        error => {
          console.error('Error occurred while retrieving posts.');
          console.error('error:', error);
        },
        () => this.isLoading = false
      );
  }
}
