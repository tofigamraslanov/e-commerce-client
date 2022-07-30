import { _isAuthenticated } from './../../services/common/auth.service';
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

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private toastrService: CustomToastrService,
    private spinnerService: NgxSpinnerService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.spinnerService.show(SpinnerType.BallAtom);

    if (!_isAuthenticated) {
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
