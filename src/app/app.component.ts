import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MiniETicaret';
  constructor(private toastr: CustomToastrService) {
    toastr.message("Toastr Çalışıyor!!", "Toastr", { messageType: ToastrMessageType.Error, position: ToastrPosition.TopLeft });
    toastr.message("Toastr Çalışıyor!!", "Toastr", { messageType: ToastrMessageType.Warning, position: ToastrPosition.TopLeft });
    toastr.message("Toastr Çalışıyor!!", "Toastr", { messageType: ToastrMessageType.Success, position: ToastrPosition.BottomLeft });
    toastr.message("Toastr Çalışıyor!!", "Toastr", { messageType: ToastrMessageType.Info, position: ToastrPosition.BottomLeft });
  }
}
