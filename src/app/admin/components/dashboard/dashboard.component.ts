import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { SignalRService } from '../../../services/common/signalr.service';
import { ReceiveFunctions } from '../../../constants/receive-functions';
import { HubUrls } from '../../../constants/hub-urls';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  constructor(private alertify: AlertifyService, spinner: NgxSpinnerService, private singnalRService: SignalRService) {
    super(spinner)
    singnalRService.start(HubUrls.ProductHub)
  }
  
  ngOnInit(): void {
    this.singnalRService.on(ReceiveFunctions.ProductAddedMessageReceiveFunction, message => {
      this.alertify.message(message, {
        messageType: MessageType.Notify,
        position:Position.TopLeft
      })
    });
  }

  m(){
    this.alertify.message("Kıçım Patladı", {
      messageType: MessageType.Error,
      delay : 5,
      position : Position.BottomRight
    })
  }

  d(){
    this.alertify.dismiss();
  }

}
