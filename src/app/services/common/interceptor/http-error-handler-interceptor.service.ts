import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { UserService } from '../models/user.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private alertifyService: AlertifyService, private userService: UserService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(catchError(error => {
      switch (error.status) {
        case HttpStatusCode.Unauthorized:
          this.alertifyService.message("Yetkisiz işlem. Bu işlemi yapmaya yetkiniz bulunmamaktadır!", {
            messageType: MessageType.Error,
            position: Position.BottomRight
          });
          this.userService.refreshTokenLogin(localStorage.getItem("refreshToken")).then(data => {

          });
          break;
        case HttpStatusCode.InternalServerError:
          this.alertifyService.message("Sunucu erişim hatası!", {
            messageType: MessageType.Error,
            position: Position.BottomRight
          });
          break;
        case HttpStatusCode.BadRequest:
          this.alertifyService.message("Geçersiz istek!", {
            messageType: MessageType.Error,
            position: Position.BottomRight
          });
          break;
        case HttpStatusCode.NotFound:
          this.alertifyService.message("Bulunamadı!", {
            messageType: MessageType.Error,
            position: Position.BottomRight
          });
          break;
        case HttpStatusCode.Forbidden:
          this.alertifyService.message("Erişim reddedildi. Bu kaynağa erişim izniniz yok!", {
            messageType: MessageType.Error,
            position: Position.BottomRight
          });
          break;
        case HttpStatusCode.GatewayTimeout:
          this.alertifyService.message("Gateway zaman aşımına uğradı. Lütfen daha sonra tekrar deneyin!", {
            messageType: MessageType.Error,
            position: Position.BottomRight
          });
          break;
        case HttpStatusCode.RequestTimeout:
          this.alertifyService.message("İstek zaman aşımına uğradı. Lütfen daha sonra tekrar deneyin!", {
            messageType: MessageType.Error,
            position: Position.BottomRight
          });
          break;
        case HttpStatusCode.ServiceUnavailable:
          this.alertifyService.message("Servis kullanılamıyor. Lütfen daha sonra tekrar deneyin!", {
            messageType: MessageType.Error,
            position: Position.BottomRight
          });
          break;
        default:
          this.alertifyService.message("Beklenmeyen hata!", {
            messageType: MessageType.Error,
            position: Position.BottomRight
          });
          break;
      }
      return of(error);
    }));

  }

}
