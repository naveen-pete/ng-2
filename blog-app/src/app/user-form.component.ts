import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {
  form: FormGroup;

  constructor(_fb: FormBuilder) {
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
    console.log('Form submitted.');
    console.log(this.form);
  }

  checkEmail(control: FormControl){
        var regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var valid = regEx.test(control.value);
        return valid ? null : { email: true };
  }
}
