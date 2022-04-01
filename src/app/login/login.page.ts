import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Toast } from '@capacitor/toast';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  showLoginToast = async () => {
    await Toast.show({
      text: 'Login success',
      duration: 'long',
      position: 'top',
    });
  };

  login(form) {
    this.showLoginToast();
    this.router.navigateByUrl('tabs/tab1');
  }
}
