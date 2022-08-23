import { Router } from '@angular/router';
import { Component } from '@angular/core';
import {
  CustomToastrService,
  ToastrMessagePosition,
  ToastrMessageType,
} from './services/ui/custom-toastr.service';
import { AuthService } from './services/common/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    public authService: AuthService,
    private toastrSerice: CustomToastrService,
    private router: Router
  ) {
    authService.identityCheck();
  }

  signOut() {
    localStorage.removeItem('accessToken');
    this.authService.identityCheck();
    this.router.navigate(['']);
    this.toastrSerice.message('You are logged out', 'Logged Out', {
      messageType: ToastrMessageType.Warning,
      messagePosition: ToastrMessagePosition.TopRight,
    });
  }
}
