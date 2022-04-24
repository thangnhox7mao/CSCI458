import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/shared/authentication-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {
  ionicForm: FormGroup;
  isSubmitted = false;

  constructor(
    public authService: AuthenticationService,
    public formBuilder: FormBuilder
  ) {}

  get errorControl() {
    return this.ionicForm.controls;
  }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
    });
  }

  async resetPassword() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      const { email } = this.ionicForm.value;
      await this.authService.passwordRecover(email);
      this.ionicForm.controls.email.setValue('');
      this.ionicForm.controls.email.setErrors(null);
    }
  }
}
