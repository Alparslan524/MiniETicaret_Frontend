import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { HubUrls } from 'src/app/constants/hub-urls';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { SignalRService } from 'src/app/services/common/signalr.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private signalRService: SignalRService, private alertifyService: AlertifyService) {
    super(spinner);
    signalRService.start(HubUrls.ProductHub)
  }

  ngOnInit(): void {
    this.signalRService.on(ReceiveFunctions.ProductAddedMessageReceiveFunction, message => {
      this.alertifyService.message(message, {
        messageType: MessageType.Message,
        position: Position.TopRight
      })
    });
    this.showSpinner(SpinnerType.SquareJellyBox)
  }

}
