import { Component, OnInit, OnDestroy } from '@angular/core'; 
import { Subscription } from 'rxjs/Subscription';

import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit, OnDestroy {
  private _subscription: Subscription;
  users: any[];

  constructor(private _userService: UserService) {}

  ngOnInit() {
    console.log('Calling UserService.getUsers()..');
    this._subscription = this._userService.getUsers()
      .subscribe(data => {
        console.info('Users retrieved successfully');
        this.users = data;
      });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
