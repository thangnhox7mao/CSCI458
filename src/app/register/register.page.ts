import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Toast } from '@capacitor/toast';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  showRegisterToast = async () => {
    await Toast.show({
      text: 'Register success',
      duration: 'long',
      position: 'top',
    });
  };

  register(form) {
    this.showRegisterToast();
    this.router.navigateByUrl('login');
  }
}
