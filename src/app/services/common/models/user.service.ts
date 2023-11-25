import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from 'src/app/entities/User';
import { CreateUser } from 'src/app/contracts/Users/create_user';
import { Observable, firstValueFrom } from 'rxjs';

import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { Token } from 'src/app/contracts/Token/token';
import { TokenResponse } from 'src/app/contracts/Token/tokenResponse';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService, private alertifyService: AlertifyService) { }

  async create(user: User) {
    const observable: Observable<CreateUser | User> = this.httpClientService.post<CreateUser | User>({
      controller: "users"
    }, user);
    return await firstValueFrom(observable) as CreateUser;
  }

  async login(userNameorEmail: string, Password: string, callBack?: () => void): Promise<any> {
    const observable: Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller: "auth",
      action: "login"
    }, { userNameorEmail, Password })
    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);


      this.alertifyService.message("Kullanıcı girişi başarılı", {
        messageType: MessageType.Success,
        position: Position.TopRight
      })
    }
    callBack();
  }

  async googleLogin(user: SocialUser, callBack?: () => void): Promise<any> {
    const observable: Observable<SocialUser | TokenResponse> = await this.httpClientService.post<SocialUser | TokenResponse>({
      controller: "auth",
      action: "googlelogin",
    }, user)
    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);

      this.alertifyService.message("Google ile giriş başarıyla sağlanmıştır.", {
        messageType: MessageType.Success,
        position: Position.TopRight
      });
    }
    callBack();
  }

  async refreshTokenLogin(refreshToken: string, callBack?: () => void): Promise<any> {
    const observable: Observable<any | TokenResponse> = this.httpClientService.post({
      controller: "auth",
      action: "refreshtokenlogin"
    }, { refreshToken: refreshToken });

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;

    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
    }

    callBack();
  }

  async passwordReset(email: string, callBack?: () => void) {
    const observable: Observable<any> = await this.httpClientService.post({
      controller: "auth",
      action: "password-reset",
    }, { email: email });

    await firstValueFrom(observable);
    callBack();
  }

  async verifyResetToken(resetToken: string, userId: string, callBack?: () => void): Promise<boolean> {
    const observable: Observable<any> = await this.httpClientService.post({
      controller: "auth",
      action: "verify-reset-token",
    }, { resetToken: resetToken, userId: userId });

    const state: boolean = await firstValueFrom(observable);
    callBack();
    return state;
  }

  async updatePassword(userId: string, resetToken: string, password: string, passwordConfirm: string, successCallBack?: () => void,
    errorCallBack?: (error) => void) {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "users",
      action: "update-password"
    }, { userId: userId, resetToken: resetToken, password: password, passwordConfirm: passwordConfirm })

    const promiseData: Promise<any> = firstValueFrom(observable);
    promiseData.then(value => successCallBack()).catch(error => errorCallBack(error));
    await promiseData;
  }
}
