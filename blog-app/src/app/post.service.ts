import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class PostService {
  private _url = 'http://jsonplaceholder.typicode.com/posts';
  constructor(private _http: Http) {}

  getPosts() {
    console.log('Getting posts...');
    return this._http.get(this._url)
      .map(response => response.json());
  }
}
