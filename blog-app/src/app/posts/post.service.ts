import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class PostService {
  private _url = 'http://jsonplaceholder.typicode.com/posts';
  constructor(private _http: Http) {}

  getPosts(filter?) {
    console.log('Getting posts...');

    var url = this._url;
    if(filter && filter.userId) {
      console.log('filter.userId:', filter.userId);
      url += '?userId=' + filter.userId;
    }

    return this._http.get(url)
      .map(response => response.json());
  }

  getComments(postId) {
    console.log('Getting comments for post id ' + postId);
    return this._http.get(this._url + '/' + postId + '/comments')
      .map(response => response.json());
  }
}
