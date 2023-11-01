import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { AuthService } from './services/common/auth.service';
import { AlertifyService, MessageType, Position } from './services/admin/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MiniETicaret';
  constructor(public authService: AuthService, private alertifyService: AlertifyService, private router: Router) {
    authService.identityCheck()
  }

  signOut() {
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.router.navigate([""])
      this.alertifyService.message("Oturum kapatıldı", {
        messageType: MessageType.Message,
        position: Position.TopRight
      });
  }

}
