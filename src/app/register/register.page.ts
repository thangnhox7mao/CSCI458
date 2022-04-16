import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Toast } from '@capacitor/toast';
import { AuthenticationService } from 'src/shared/authentication-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  constructor(
    private router: Router,
    public authService: AuthenticationService
  ) {}

  ngOnInit() {}

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

  register(form) {
    const { password, email } = form.value;

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
