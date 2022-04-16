import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Toast } from '@capacitor/toast';
import { AuthenticationService } from 'src/shared/authentication-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    private router: Router,
    public authService: AuthenticationService
  ) {}

  ngOnInit() {}

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

  login(form) {
    console.log(form.value);
    const { password, email } = form.value;

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
