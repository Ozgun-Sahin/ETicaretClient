import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
import { UserAuthService } from './models/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService: CustomToastrService, private userAuthService: UserAuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(catchError(error => {
      switch (error.status) {

        case HttpStatusCode.Unauthorized:
          this.toastrService.message("Bu işlemi yapmaya yetkiniz bulunmamaktadır!", "Yetkisiz İşlem", {
            messageType: ToastrMessageType.Warning, positon: ToastrPosition.BottomFullWidth
          });

          this.userAuthService.refreshTokenLoign(localStorage.getItem("refreshToken")).then(data => {

          });
          break;

        case HttpStatusCode.InternalServerError:
          this.toastrService.message("Sunucuya Erişilemiyor!", "Sunucu hatası!", {
            messageType: ToastrMessageType.Warning, positon: ToastrPosition.BottomFullWidth
          });
          break;

        case HttpStatusCode.BadRequest:
          this.toastrService.message("Geçersiz İstek Yapıldı!", "Sayfa Bulunamadı", {
            messageType: ToastrMessageType.Warning, positon: ToastrPosition.BottomFullWidth
          });
          break;
          
        case HttpStatusCode.NotFound:
          this.toastrService.message("Sayfa Bulunamadı!", "Yetkisiz İşlem", {
            messageType: ToastrMessageType.Warning, positon: ToastrPosition.BottomFullWidth
          });
          break;

        default:
          this.toastrService.message("Beklenmeyen bir hata meydana geldi!", "Hata!", {
            messageType: ToastrMessageType.Warning, positon: ToastrPosition.BottomFullWidth
          });
          break;

      }
      return of(error);
    }));
  }
}
