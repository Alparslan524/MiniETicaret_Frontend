import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { TokenResponse } from 'src/app/contracts/Token/tokenResponse';
import { AuthService } from 'src/app/services/common/auth.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private fb: FormBuilder, private userService: UserService,
    private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router,
    private socialAuthService: SocialAuthService) {
    super(spinner)

    socialAuthService.authState.subscribe(async (user: SocialUser) => {
      this.showSpinner(SpinnerType.SquareJellyBox);
      switch (user.provider) {
        case "GOOGLE":
          await userService.googleLogin(user, () => {
            this.authService.identityCheck();
            this.hideSpinner(SpinnerType.SquareJellyBox);
          })
          break;
      }
    });
  }



  frm: FormGroup
  ngOnInit(): void {
    this.frm = this.fb.group({
      userName: ["", [Validators.required]],
      password: ["", [Validators.required]]
    })
  }

  get component() {
    return this.frm.controls;
  }

  submitted: boolean = false;
  async onSubmit(data: any) {
    this.submitted = true;
    if (this.frm.invalid) {
      return;
    }
    this.showSpinner(SpinnerType.SquareJellyBox);
    await this.userService.login(this.frm.value.userName, this.frm.value.password, () => {
      this.authService.identityCheck()

      //return url işlemi. Herhangi bir yere girmediğinde eğer giriş yapmamışsa logine atıyor ve giriş yaparsa geri o eski sayfaya gönderiyor
      this.activatedRoute.queryParams.subscribe(params => {
        const returnUrl: string = params["returnUrl"]
        if (returnUrl) {
          this.router.navigate([returnUrl])
        }
      })
      this.hideSpinner(SpinnerType.SquareJellyBox);
    });


  }

}
