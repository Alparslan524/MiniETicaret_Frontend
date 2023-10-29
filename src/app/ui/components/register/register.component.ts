import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { User } from 'src/app/entities/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private fb: FormBuilder) {
    super(spinner)
  }

  frm: FormGroup;
  ngOnInit(): void {
    this.frm = this.fb.group({
      nameSurname: ["", [Validators.required, Validators.minLength(3)]],
      userName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      passwordAgain: ["", [Validators.required]]
    })
  }

  get component() {
    return this.frm.controls;
  }

  submitted: boolean = false;
  onSubmit(data: User) {
    debugger;
    this.submitted = true;

  }


}
