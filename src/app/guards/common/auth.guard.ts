import { SpinnerType } from './../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrMessagePosition,
} from './../../services/ui/custom-toastr.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private jwtHelperService: JwtHelperService,
    private router: Router,
    private toastrService: CustomToastrService,
    private spinnerService: NgxSpinnerService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.spinnerService.show(SpinnerType.BallAtom);

    const token: string = localStorage.getItem('token');

    let isExpired: boolean;
    try {
      isExpired = this.jwtHelperService.isTokenExpired(token);
    } catch {
      isExpired = true;
    }

    if (!token || isExpired) {
      this.router.navigate(['login'], {
        queryParams: { returnUrl: state.url },
      });
      this.toastrService.message(
        'You need to signup!',
        'Unauthorized Access!',
        {
          messageType: ToastrMessageType.Warning,
          messagePosition: ToastrMessagePosition.TopRight,
        }
      );
    }

    this.spinnerService.hide(SpinnerType.BallAtom);

    return true;
  }
}
