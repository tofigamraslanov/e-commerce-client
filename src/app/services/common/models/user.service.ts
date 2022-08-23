import { Injectable } from '@angular/core';
import { SocialUser } from '@abacritt/angularx-social-login';
import { TokenResponse } from './../../../contracts/token/tokenResponse';
import {
  CustomToastrService,
  ToastrMessagePosition,
  ToastrMessageType,
} from './../../ui/custom-toastr.service';
import { Observable, firstValueFrom } from 'rxjs';
import { Create_User } from './../../../contracts/users/create_user';
import { HttpClientService } from '../http-client.service';
import { User } from './../../../entities/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private httpClientService: HttpClientService,
    private toastrService: CustomToastrService
  ) {}

  async create(user: User): Promise<Create_User> {
    const observable: Observable<Create_User | User> =
      this.httpClientService.post<Create_User | User>(
        {
          controller: 'users',
        },
        user
      );
    return (await firstValueFrom(observable)) as Create_User;
  }

  async login(
    userNameOrEmail: string,
    password: string,
    callBackFunction?: () => void
  ): Promise<any> {
    const observable: Observable<any | TokenResponse> =
      this.httpClientService.post<any | TokenResponse>(
        {
          controller: 'users',
          action: 'login',
        },
        {
          userNameOrEmail,
          password,
        }
      );

    const tokenResponse: TokenResponse = (await firstValueFrom(
      observable
    )) as TokenResponse;

    if (tokenResponse) {
      localStorage.setItem('accessToken', tokenResponse.token.accessToken);

      this.toastrService.message(
        'User successfully logged in',
        'Successfull Login',
        {
          messageType: ToastrMessageType.Success,
          messagePosition: ToastrMessagePosition.TopRight,
        }
      );
    }
    callBackFunction();
  }

  async googleLogin(
    user: SocialUser,
    callBackFunction?: () => void
  ): Promise<any> {
    const observable: Observable<SocialUser | TokenResponse> =
      this.httpClientService.post<SocialUser | TokenResponse>(
        {
          action: 'google-login',
          controller: 'users',
        },
        user
      );

    const tokenResponse: TokenResponse = (await firstValueFrom(
      observable
    )) as TokenResponse;

    if (tokenResponse) {
      localStorage.setItem('accessToken', tokenResponse.token.accessToken);

      this.toastrService.message(
        'User successfully logged in over Google',
        'Successfull Login',
        {
          messageType: ToastrMessageType.Success,
          messagePosition: ToastrMessagePosition.TopRight,
        }
      );
    }

    callBackFunction();
  }
}
