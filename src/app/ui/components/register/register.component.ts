import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { CreateUser } from 'src/app/contracts/Users/create_user';
import { User } from 'src/app/entities/User';
import { MessageType } from 'src/app/services/admin/alertify.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private fb: FormBuilder, private userService: UserService, private toastrService: CustomToastrService) {
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
  async onSubmit(user: User) {
    this.submitted = true;
    if (this.frm.invalid) {
      return;
    }
    const result: CreateUser = await this.userService.create(user);
    if (result.succeeded) {
      this.toastrService.message(result.message, "Kullanıcı kaydı başarılı!", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      })
    }
    else {
      this.toastrService.message(result.message, "Hata!!", {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight
      })
    }
  }


}
