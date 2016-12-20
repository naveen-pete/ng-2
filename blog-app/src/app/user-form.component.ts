import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { FormComponent } from './unsaved-changes-guard.service';
import { UserService } from './user.service';
import { User } from './user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit, OnDestroy, FormComponent {
  private _userId: string;
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
    this._subscription = this._activatedRoute.params.subscribe(params => this._userId = params['id']);

    if(!this._userId) return;

    this.title = "Edit User";

    this._userService.getUser(this._userId)
      .subscribe(
        result => this.user = result,
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
    console.log('Form submitted. Calling UserService.addUser()...');
    this._userService.addUser(this.form.value)
      .subscribe(result => {
        console.log('result:', result);
        this.form.markAsPristine();
        this._router.navigate(['/users']);
      });
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
