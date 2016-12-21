import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { FormComponent } from '../unsaved-changes-guard.service';
import { UserService } from './user.service';
import { User } from './user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit, OnDestroy, FormComponent {
  private _subscription: Subscription;
  form: FormGroup;
  user = new User();
  title = "New User";

  constructor(_fb: FormBuilder, 
      private _userService: UserService, 
      private _router: Router,
      private _activatedRoute: ActivatedRoute) {
    this.form = _fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, this.checkEmail] ],
      phone: [],
      address: _fb.group({
        street: [],
        suite: [],
        city: [],
        zipcode: []
      })
    });
  }

  ngOnInit() {
    var userId;
    this._subscription = this._activatedRoute.params.subscribe(params => userId = params['id']);

    if(!userId) return;

    this.title = "Edit User";

    console.log('Calling UserService.getUser()..');
    this._userService.getUser(userId)
      .subscribe(
        result => {
          console.info('User details retrieved successfully!');
          this.user = result;
          console.log('user:', this.user);
        },
        error => {
          if(error.status == 404) {
            this._router.navigate(['/notfound']);
          }
        }
      );

  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  save() {
    if(this.user.id) {
      console.log('Calling UserService.updateUser()..');
      this._userService.updateUser(this.user)
        .subscribe(
          result => {
            console.info('User details updated successfully!');
            console.log('result:', result);
          },
          error => {
            console.error('Error occurred while updating user.');
            console.error('error:', error);
          }
        );
    } else {
      console.log('Calling UserService.addUser()..');
      this._userService.addUser(this.user)
        .subscribe(
          result => {
            console.info('New user added successfully!');
            console.log('result:', result);
            this.form.markAsPristine();
            this._router.navigate(['/users']);
          },
          error => {
            console.error('Error occurred while adding new user.');
            console.error('error:', error);
          }
        );
    }
  }

  isFormDirty() {
    return this.form.dirty;
  }

  checkEmail(control: FormControl){
        var regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var valid = regEx.test(control.value);
        return valid ? null : { email: true };
  }
}
