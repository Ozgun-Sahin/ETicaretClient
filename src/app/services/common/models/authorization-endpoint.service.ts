import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationEndpointService {

  constructor(private httpClientService: HttpClientService) { }

  async assignRoleEndpoint(roles: string[], code: string, menu: string, successCalllback?: () => void, errorCallBack?: (error) => void) {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "AuthorizationEndpoints"
    }, {
      roles: roles,
      code: code,
      menu: menu
    })

    const promiseData = observable.subscribe({
      next: successCalllback,
      error: errorCallBack
    });

    await promiseData;
  }

  async getRolesToEndpoint(code: string, menu:string, successCalllback?: () => void, errorCallBack?: (error) => void): Promise<string[]> {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "AuthorizationEndpoints",
      action: "GetRolestoEndpoint"
    }, {
      code: code,
      menu: menu
    });

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCalllback)
      .catch(errorCallBack);

    return (await promiseData).roles;

  }
}

