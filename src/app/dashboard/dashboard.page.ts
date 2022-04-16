import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/shared/authentication-service';
import { IProduct, ProductService } from '../services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  products: IProduct[];
  constructor(
    private router: Router,
    public authService: AuthenticationService,
    private productService: ProductService,
    private alertCtrl: AlertController
  ) {
    if (this.authService.isLoggedIn) {
      this.productService.getProducts().subscribe((res) => {
        console.log(res);
        this.products = res;
      });
    } else {
      this.router.navigateByUrl('login');
    }
  }

  ngOnInit() {}

  openProduct(product: IProduct) {
    console.log(product);
  }

  async addProduct() {
    const alert = await this.alertCtrl.create({
      header: 'Add Product',
      inputs: [
        {
          name: 'title',
          placeholder: '123 California',
          type: 'text',
        },
        {
          name: 'description',
          placeholder: 'This is the best real estate',
          type: 'text',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Add',
          handler: (res) => {
            this.productService.addProduct({
              title: res.title,
              description: res.description,
            });
          },
        },
      ],
    });

    await alert.present();
  }
}
