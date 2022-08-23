import { TokenResponse } from './../../../contracts/token/tokenResponse';
import { HttpClientService } from './../../../services/common/http-client.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './../../../services/common/auth.service';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { UserService } from './../../../services/common/models/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseComponent implements OnInit {
  constructor(
    private userService: UserService,
    spinnerService: NgxSpinnerService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {
    super(spinnerService);
    socialAuthService.authState.subscribe(async (user: SocialUser) => {
      this.showSpinner(SpinnerType.BallAtom);

      await this.userService.googleLogin(user, () => {
        this.authService.identityCheck();
        this.hideSpinner(SpinnerType.BallAtom);
      });
    });
  }

  ngOnInit(): void {}

  async login(userNameOrEmail: string, password: string) {
    this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
    await this.userService.login(userNameOrEmail, password, () => {
      this.authService.identityCheck();
      this.activatedRoute.queryParams.subscribe((params) => {
        const returnUrl: string = params['returnUrl'];
        if (returnUrl) this.router.navigate([returnUrl]);
      });
      this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
    });
  }
}
