import { Component, OnInit } from '@angular/core';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(private alertify: AlertifyService) { }

  message = "Alertify Çalışıyor!!";
  
  ngOnInit(): void {
    //this.alertify.message(this.message, MessageType.Success, Position.TopRight,1,false);
    this.alertify.message(this.message, { messageType: MessageType.Success, position: Position.TopRight, delay: 3, dismissOthers:false });
  }
}
