import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ClProducto } from '../model/ClProducto';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.page.html',
  styleUrls: ['./product-edit.page.scss'],
})
export class ProductEditPage implements OnInit {
  productForm!: FormGroup;
  producto: ClProducto = new ClProducto();
  id: number = 0;

  constructor(
    public restApi: ProductServiceService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getProduct(this.route.snapshot.params['id']);
    this.productForm = this.formBuilder.group({
      'prod_name': [null, Validators.required],
      'prod_desc': [null, Validators.required],
      'prod_price': [null, Validators.required],
      'prod_cantidad': [null, Validators.required],
    });
  }

  async onFormSubmit() {
    this.producto.idProducto = this.id;

    await this.restApi.updateProduct(this.id, this.productForm.value)
      .subscribe({
        next: (res) => {
          let id = res['idProducto'];
          this.router.navigate(['/product-detail/' + id]);
        },
        complete: () => {},
        error: (err) => {
          console.log(err);
        }
      });
  }

  async getProduct(id: number) {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
  
    await loading.present();
  
    await this.restApi.getProduct(id)
      .subscribe({
        next: (data) => {
          this.id = data.idProducto;
          this.productForm.setValue({
            prod_name: data.nombreprod,
            prod_desc: data.descripcion,
            prod_price: data.precio,
            prod_cantidad: data.cantidad
          });
          loading.dismiss();
        },
        complete: () => {},
        error: (err) => {
          console.log(err);
          loading.dismiss();
        }
      });
  }
  

  async presentAlertConfirm(msg: string) {
    const alert = await this.alertController.create({
      header: 'Warning!',
      message: msg,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.router.navigate(['/product-list/']);
          }
        }
      ]
    });
    await alert.present();
  }
}
