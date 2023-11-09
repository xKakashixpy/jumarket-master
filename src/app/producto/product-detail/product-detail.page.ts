import { Component, OnInit } from '@angular/core';

// Import a utilizar 
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { ClProducto } from '../model/ClProducto';
import { ProductServiceService } from '../product-service.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  producto: ClProducto = new ClProducto();  // Inicializamos el producto vacío

  constructor(
    public restApi: ProductServiceService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.getProduct();
  }

  async getProduct() {
    const loading = await this.loadingController.create({ message: 'Loading...' });
    await loading.present();
    await this.restApi.getProduct(Number(this.route.snapshot.paramMap.get('idProducto'))!)
      .subscribe({
        next: (res: ClProducto) => {
          this.producto = res;
          loading.dismiss();
        },
        complete: () => {},
        error: (err) => {
          console.log("Error DetailProduct Página", err);
          loading.dismiss();
        },
      });
  }

  async delete(id: number) {
    this.presentAlertConfirm(id, 'Confirme la Eliminación, De lo contrario, Cancele');
  }

  async presentAlertConfirm(id: number, msg: string) {
    const alert = await this.alertController.create({
      header: 'Warning!',
      message: msg,
      buttons: [
        {
          text: 'Eliminar : ' + id + ' OK',
          handler: () => {
            this.router.navigate(['']);
            this.deleteConfirmado(id);
          },
        },
      ],
    });
    await alert.present();
  }

  async deleteConfirmado(id: number) {
    const loading = await this.loadingController.create({
      message: 'Loading...',
    });
    await loading.present();
    await this.restApi.deleteProduct(id)
      .subscribe({
        next: (res) => {
          console.log("Eliminando producto", res);
          loading.dismiss();
          this.router.navigate(['/product-list']);
        },
        complete: () => {},
        error: (err) => {
          console.log("Error DetailProduct Página", err);
          loading.dismiss();
        },
      });
  }
}