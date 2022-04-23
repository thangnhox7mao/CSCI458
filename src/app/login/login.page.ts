import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Toast } from '@capacitor/toast';
import { AuthenticationService } from 'src/shared/authentication-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  ionicForm: FormGroup;
  isSubmitted = false;

  constructor(
    private router: Router,
    public authService: AuthenticationService,
    public formBuilder: FormBuilder
  ) {
    if (this.authService.isLoggedIn) {
      this.router.navigateByUrl('dashboard');
    }
  }

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

  showLoginToast = async () => {
    await Toast.show({
      text: 'Login success',
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

  login() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      const { password, email } = this.ionicForm.value;

      this.authService
        .signIn(email, password)
        .then((res) => {
          setTimeout(() => {
            if (this.authService.isEmailVerified) {
              this.router.navigateByUrl('dashboard');
            } else {
              this.showErrorMessage('Email is not verified');
              return false;
            }
          }, 500);
        })
        .catch((error) => {
          this.showErrorMessage(error.message);
        });

      this.showLoginToast();
    }
  }
}
