import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from 'src/app/entities/User';
import { CreateUser } from 'src/app/contracts/Users/create_user';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService) { }

  async create(user: User) {
    const observable: Observable<CreateUser | User> = this.httpClientService.post<CreateUser | User>({
      controller: "users"
    }, user);
    return await firstValueFrom(observable) as CreateUser;
  }

  async login(userNameorEmail: string, Password: string, callBack?: () => void): Promise<void> {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "users",
      action: "login"
    }, { userNameorEmail, Password })
    await firstValueFrom(observable);
    callBack();
  }
}
