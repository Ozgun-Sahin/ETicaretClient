import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/ui/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { AuthService, _isAuthenticated } from '../../services/common/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const jwtHelper: JwtHelperService = inject(JwtHelperService);

  const router: Router = inject(Router);

  const toastr: CustomToastrService = inject(CustomToastrService);

  const spinner: NgxSpinnerService = inject(NgxSpinnerService);

  spinner.show(SpinnerType.BallAtom);

  const authService: AuthService = inject(AuthService);

  //const token: string = localStorage.getItem("accessToken");

  ////const decodeToken = jwtHelper.decodeToken(token);
  ////const expirationDate: Date = jwtHelper.getTokenExpirationDate(token);
  ////const expired: boolean = jwtHelper.isTokenExpired(token);



  //let expired: boolean;
  //try {
  //  expired = jwtHelper.isTokenExpired(token);
  //} catch  {
  //  expired = true;
  //}
  
  if (!_isAuthenticated) {
    router.navigate(["login"], { queryParams: { returnUrl: state.url } });
    toastr.message("Lüften giriş yapın", "Yetkisiz erişim", { messageType: ToastrMessageType.Warning, positon: ToastrPosition.TopRight })
  }

  spinner.hide(SpinnerType.BallAtom);

  //debugger;

  return true;
};
