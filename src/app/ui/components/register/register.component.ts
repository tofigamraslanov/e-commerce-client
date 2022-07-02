import { Component, OnInit } from '@angular/core';
import {
  CustomToastrService,
  ToastrMessagePosition,
  ToastrMessageType,
} from './../../../services/ui/custom-toastr.service';
import { UserService } from './../../../services/common/models/user.service';
import { Create_User } from './../../../contracts/users/create_user';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/entities/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: CustomToastrService
  ) {}

  formGroup: FormGroup;

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group(
      {
        fullName: [
          '',
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.minLength(3),
          ],
        ],
        userName: [
          '',
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.minLength(3),
          ],
        ],
        email: [
          '',
          [Validators.required, Validators.maxLength(250), Validators.email],
        ],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: (group: AbstractControl): ValidationErrors | null => {
          let password = group.get('password').value;
          let confirmPassword = group.get('confirmPassword').value;
          return password === confirmPassword ? null : { notSame: true };
        },
      }
    );
  }

  get component() {
    return this.formGroup.controls;
  }

  submitted: boolean = false;

  async onSubmit(user: User) {
    this.submitted = true;

    if (this.formGroup.invalid) return;

    const result: Create_User = await this.userService.create(user);

    if (result.succeeded) {
      this.toastrService.message(result.message, 'Success', {
        messageType: ToastrMessageType.Success,
        messagePosition: ToastrMessagePosition.TopRight,
      });
    } else {
      this.toastrService.message(result.message, 'Error', {
        messageType: ToastrMessageType.Error,
        messagePosition: ToastrMessagePosition.TopRight,
      });
    }
  }
}
