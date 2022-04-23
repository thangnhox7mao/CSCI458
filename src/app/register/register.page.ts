import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Toast } from '@capacitor/toast';
import { AuthenticationService } from 'src/shared/authentication-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  ionicForm: FormGroup;
  isSubmitted = false;

  constructor(
    private router: Router,
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
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  showRegisterToast = async () => {
    await Toast.show({
      text: 'Please check email to verify ',
      duration: 'long',
      position: 'top',
    });
  };

  showMisMatchPasswordToast = async () => {
    await Toast.show({
      text: 'Error Password and Confirm Password need to be the same',
      duration: 'long',
      position: 'top',
    });
  };

  showErrorMessage = async (message) => {
    await Toast.show({
      text: message ? message : 'Something went wrong !!',
      duration: 'long',
      position: 'top',
    });
  };

  register() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      this.showErrorMessage('Please provide all the required values!');
      return false;
    } else {
      const { password, email } = this.ionicForm.value;
      this.authService
        .registerUser(email, password)
        .then((res) => {
          this.authService.sendVerificationMail();
          this.showRegisterToast();
          this.router.navigateByUrl('verify-email');
        })
        .catch((e) => {
          this.showErrorMessage(e.message);
        });
    }
  }
}
