import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../../../services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseComponent implements OnInit {
  constructor(
    private userService: UserService,
    spinnerService: NgxSpinnerService
  ) {
    super(spinnerService);
  }

  ngOnInit(): void {}

  async login(userNameOrEmail: string, password: string) {
    this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
    await this.userService.login(userNameOrEmail, password, () =>
      this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating)
    );
  }
}
