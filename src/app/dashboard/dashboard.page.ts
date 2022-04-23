import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Toast } from '@capacitor/toast';
import { AlertController, IonItemSliding } from '@ionic/angular';
import { AuthenticationService } from 'src/shared/authentication-service';
import { LoaderService } from '../services/loader.service';
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
    private alertCtrl: AlertController,
    private loaderService: LoaderService
  ) {
    if (this.authService.isLoggedIn) {
      this.loaderService.showHideAutoLoader();
      this.productService.getProducts().subscribe(
        (res) => {
          console.log(res);
          this.products = res;
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.router.navigateByUrl('login');
    }
  }

  ngOnInit() {}

  async openProduct(product: IProduct, slidingItem: IonItemSliding) {
    slidingItem.close();
    console.log(product);
    const alert = await this.alertCtrl.create({
      header: 'Update Product',
      inputs: [
        {
          name: 'title',
          value: product.title,
          placeholder: '123 California',
          type: 'text',
        },
        {
          name: 'description',
          value: product.description,
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
          text: 'Update',
          handler: (res) => {
            this.loaderService.showLoader();
            setTimeout(() => {
              this.productService
                .updateProduct({
                  title: res.title,
                  description: res.description,
                  id: product.id,
                })
                .then((data) => {
                  this.loaderService.hideLoader();
                })
                .catch((err) => {
                  console.log(err);
                  this.loaderService.hideLoader();
                });
            }, 500);
          },
        },
      ],
    });

    await alert.present();
  }

  showMessage = async (message) => {
    await Toast.show({
      text: message ? message : 'Something went wrong !!',
      duration: 'long',
      position: 'top',
    });
  };

  async deleteProduct(product: IProduct, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.loaderService.showLoader();
    setTimeout(async () => {
      try {
        await this.productService.deleteProduct(product);
      } catch (error) {
        console.log(error);
      }

      this.loaderService.hideLoader();
    }, 500);
    this.showMessage('Product is deleted');
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
            this.loaderService.showLoader();
            setTimeout(() => {
              this.productService
                .addProduct({
                  title: res.title,
                  description: res.description,
                })
                .then((data) => {
                  this.loaderService.hideLoader();
                })
                .catch((err) => {
                  console.log(err);
                  this.loaderService.hideLoader();
                });
            }, 500);
          },
        },
      ],
    });

    await alert.present();
  }
}
