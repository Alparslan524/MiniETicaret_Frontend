import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { AuthService } from 'src/app/services/common/auth.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent extends BaseComponent {

  constructor(spinner: NgxSpinnerService, private userService: UserService, private alertifyService: AlertifyService) { super(spinner) }

  passwordReset(email: string) {
    this.showSpinner(SpinnerType.SquareJellyBox);
    this.userService.passwordReset(email, () => {
      this.hideSpinner(SpinnerType.SquareJellyBox);
      this.alertifyService.message("Şifre yenileme maili başarıyla gönderilmiştir!", {
        messageType: MessageType.Success,
        position: Position.TopRight
      })
    })
  }

}
