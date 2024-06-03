import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { AuthService } from './services/common/auth.service';
import { Router } from '@angular/router';
import { HttpClientService } from './services/common/http-client.service';
import { ComponentType, DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  //title = 'ETicaretClient';

  @ViewChild(DynamicLoadComponentDirective, { static: true }) dynamicLoadComponentDirective: DynamicLoadComponentDirective;
  
  constructor(
    public authService: AuthService,
    private toastrService: CustomToastrService,
    private router: Router,
    private dynamicLoadComponentService: DynamicLoadComponentService,
    private httpClientService: HttpClientService) {

    //httpClientService.put({
    //  controller: "basket"
    //}, {
    //  basketItemId: "757807a5-c7a2-4434-a412-5b3ddb583b56",
    //  quantity: 32
    //}).subscribe(data => {
    //  debugger;
    //});



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

  loadComponent() {
    this.dynamicLoadComponentService.loadComponent(ComponentType.BasketsComponent, this.dynamicLoadComponentDirective.viewContainerRef);
  }

}

//$.get("https://localhost:7198/api/products", data=>{
//  console.log(data)
//})
