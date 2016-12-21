import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  private _url = 'http://jsonplaceholder.typicode.com/users';

  constructor(private _http: Http) {}

  getUsers() {
    console.log('Getting users...');
    return this._http.get(this._url)
      .map(res => res.json());
  }

  addUser(user) {
    console.log('Adding user...');
    console.log('user:', user);
    return this._http.post(this._url, JSON.stringify(user))
      .map(res => res.json());
  }

  getUser(userId) {
    console.log('Getting user...');
    console.log('userId:', userId);
    return this._http.get(this.getUrlForUser(userId))
      .map(res => res.json());
  }

  updateUser(user) {
    console.log('Updating user...');
    console.log('user:', user);
    return this._http.put(this.getUrlForUser(user.id), JSON.stringify(user))
      .map(res => res.json());
  }

  deleteUser(userId) {
    console.log('Deleting user...');
    console.log('userId:', userId);
    return this._http.delete(this.getUrlForUser(userId))
      .map(res => res.json());
  }

  private getUrlForUser(userId) {
    return this._url + '/' + userId;
  }
}
