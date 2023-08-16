import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'ETicaretClient';
  constructor(private toastrService: CustomToastrService){
    toastrService.message("Selam", "Özgün", {messageType: ToastrMessageType.Info, positon: ToastrPosition.TopCenter});
    toastrService.message("Merhaba", "Özgün", {messageType: ToastrMessageType.Error, positon: ToastrPosition.TopLeft});
    toastrService.message("Selam", "göt", {messageType: ToastrMessageType.Success, positon: ToastrPosition.TopRight});
    toastrService.message("Merhaba", "göt", {messageType: ToastrMessageType.Warning, positon: ToastrPosition.BottomFullWidth});
  }
}


