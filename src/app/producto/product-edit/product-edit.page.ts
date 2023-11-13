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
  producto: ClProducto = {
    idProducto: 1,
    codigo: '09-G12',
    nombreprod:'h' ,    
    precio: 0,
    cantidad: 0,
    fechaNacimiento: new Date(),
    rut: 0,
    dv: '0',
    enfermedad: 'h',
    fonocontacto: 0,
    categoria: '',
    editorial: 'h',
    raza: 'h',
    edad: 0,
    altura: 0,
    hrini: 'h',
    hrfin: 'h',
    direccion: 'h',
    fCreacion: new Date()
  };
  id: any = '';

  constructor(
    public restApi: ProductServiceService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    console.log("ngOnInit ID:" + this.route.snapshot.params['id']);
    this.getProduct(this.route.snapshot.params['id']);
    this.productForm = this.formBuilder.group({
      'prod_name': [null, Validators.required],
      'prod_categoria': [null, Validators.required],
      'prod_price': [null, Validators.required],
      'prod_cantidad': [null, Validators.required],
    });
  }

  async onFormSubmit() {
    console.log("onFormSubmit ID:" + this.id);

    // Actualizamos el producto
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
    if (id) {
      const loading = await this.loadingController.create({
        message: 'Loading...'
      });
      await loading.present();

      console.log("URL para obtener producto:", `https://sumativa2.onrender.com/api/productos/${id}`);
      

      await this.restApi.getProduct(id)
        .subscribe({
          next: (data) => {
            console.log("getProductID data****");
            console.log(data);
            if (data && data.idProducto) {
              this.id = data.idProducto;
              this.productForm.patchValue({
                'prod_name': data.nombreprod || null,
                'prod_desc': data.categoria || null,
                'prod_price': data.precio || null,
                'prod_cantidad': data.cantidad || null
              });
            } else {
              console.error("Invalid response or missing idProducto property");
            }
            loading.dismiss();
          },
          complete: () => {},
          error: (err) => {
            console.log("getProductID Errr****+");
            console.log(err);
            loading.dismiss();
          }
        });
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
