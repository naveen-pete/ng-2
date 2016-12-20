import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { FormComponent } from './unsaved-changes-guard.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit, FormComponent {
  form: FormGroup;
  user = { 
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: ''
    }
  };

  constructor(_fb: FormBuilder, private _userService: UserService, private _router: Router) {
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

  ngOnInit() {}

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
