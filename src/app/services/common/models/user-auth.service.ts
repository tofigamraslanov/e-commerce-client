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
export class UserAuthService {
  constructor(
    private httpClientService: HttpClientService,
    private toastrService: CustomToastrService
  ) {}

  async login(
    userNameOrEmail: string,
    password: string,
    callBackFunction?: () => void
  ): Promise<any> {
    const observable: Observable<any | TokenResponse> =
      this.httpClientService.post<any | TokenResponse>(
        {
          controller: 'auth',
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
      localStorage.setItem('refreshToken', tokenResponse.token.refreshToken);

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

  async refreshToken(
    refreshToken: string,
    callBackFunction?: () => void
  ): Promise<any> {
    const observable: Observable<any | TokenResponse> =
      this.httpClientService.post(
        {
          controller: 'auth',
          action: 'refreshtokenlogin',
        },
        {
          refreshToken: refreshToken,
        }
      );

    const tokenResponse: TokenResponse = (await firstValueFrom(
      observable
    )) as TokenResponse;

    if (tokenResponse) {
      localStorage.setItem('accessToken', tokenResponse.token.accessToken);
      localStorage.setItem('refreshToken', tokenResponse.token.refreshToken);
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
          controller: 'auth',
          action: 'google-login',
        },
        user
      );

    const tokenResponse: TokenResponse = (await firstValueFrom(
      observable
    )) as TokenResponse;

    if (tokenResponse) {
      localStorage.setItem('accessToken', tokenResponse.token.accessToken);
      localStorage.setItem('refreshToken', tokenResponse.token.refreshToken);

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

  async facebookLogin(
    user: SocialUser,
    callBackFunction?: () => void
  ): Promise<any> {
    const observable: Observable<SocialUser | TokenResponse> =
      await this.httpClientService.post(
        {
          controller: 'auth',
          action: 'facebook-login',
        },
        user
      );

    const tokenResponse: TokenResponse = (await firstValueFrom(
      observable
    )) as TokenResponse;

    if (tokenResponse) {
      localStorage.setItem('accessToken', tokenResponse.token.accessToken);
      localStorage.setItem('refreshToken', tokenResponse.token.refreshToken);

      this.toastrService.message(
        'User successfully logged in over Facebook',
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
