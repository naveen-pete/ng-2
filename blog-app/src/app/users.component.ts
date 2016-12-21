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
  isLoading = true;

  constructor(private _userService: UserService) {}

  ngOnInit() {
    console.log('Calling UserService.getUsers()..');
    this._subscription = this._userService.getUsers()
      .subscribe(
        result => {
          console.info('Users retrieved successfully!');
          this.users = result;
        },
        error => {
          console.error('Error occurred while retrieving users.');
          console.error('error:', error);
        },
        () => this.isLoading = false
      );
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  deleteUser(user) {
    if(confirm('Are you sure you want to delete ' + user.name + '?')) {
      console.log('Calling UserService.deleteUser()..');

      var index = this.users.indexOf(user);
      this.users.splice(index, 1);

      this._userService.deleteUser(user.id)
        .subscribe(
          result => {
            console.info('User deleted successfully!');
            console.log('result:', result);
          },
          error => {
            console.error('Error occurred while deleting user.');
            console.error('error:', error);
            this.users.splice(index, 0, user);
          }
        );
    }
  }
}
