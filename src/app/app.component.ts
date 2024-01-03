import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { AuthService } from './services/common/auth.service';
import { Router } from '@angular/router';
declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  //title = 'ETicaretClient';
  constructor(public authService: AuthService, private toastrService: CustomToastrService, private router:Router){
    authService.identityCheck();
  }

  signOut() {
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.router.navigate([""]);
    this.toastrService.message("Çıkış işlemi başarılı!", "Oturum Kapatıldı", {
      messageType: ToastrMessageType.Warning,
      positon: ToastrPosition.TopRight
    })
  }
}

$.get("https://localhost:7198/api/products", data=>{
  console.log(data)
})
