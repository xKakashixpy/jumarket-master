import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClProducto } from '../model/ClProducto';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.page.html',
  styleUrls: ['./product-edit.page.scss'],
})
export class ProductEditPage implements OnInit {
  productForm: FormGroup;
  producto: ClProducto = {
    idProducto: 0,
    codigo: "09-G12",
    nombreprod: "",
    descripcion: "",
    precio: 0,
    cantidad: 0,
    fechaNacimiento: new Date(),
    rut: 0,
    dv: "0",
    enfermedad: "0",
    fonocontacto: 0,
    categoria: "0",
    editorial: "0",
    raza: "0",
    edad: 0,
    altura: 0,
    hrini: "0",
    hrfin: "0",
    direccion: "0",
    fCreacion: new Date(),
  };

  constructor(
    public restApi: ProductServiceService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder
  ) {
    this.productForm = this.formBuilder.group({
      'prod_name': [null, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      'prod_desc': [null, Validators.required],
      'prod_price': [null, [Validators.required, Validators.pattern('^[0-9]+$')]],
      'prod_cantidad': [null, [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  ngOnInit() {
    this.getProduct(this.route.snapshot.params['id']);
  }

  async onFormSubmit() {
    this.producto.idProducto = this.route.snapshot.params['id'];

    try {
      await this.restApi.updateProduct(this.producto.idProducto, this.producto).toPromise();
      this.router.navigate(['/product-detail/' + this.producto.idProducto]);
    } catch (err) {
      console.log(err);
    }
  }

  async getProduct(idProducto: number) {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
  
    try {
      await loading.present();
      const data = await this.restApi.getProduct(idProducto).toPromise();
  
      if (data && data.idProducto != null) {
        this.producto = data;
        this.productForm.setValue({
          prod_name: data.nombreprod,
          prod_price: data.precio,
          prod_cantidad: data.cantidad,
          prod_desc: data.descripcion
        });
      } else {
        this.presentAlertConfirm('Product not found.');
        this.router.navigate(['/product-list/']);
      }
    } catch (err) {
      console.log(err);
    } finally {
      loading.dismiss();
    }
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
