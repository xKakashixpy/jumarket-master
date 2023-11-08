import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ClProducto } from '../model/ClProducto';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.page.html',
  styleUrls: ['./product-add.page.scss'],
})
export class ProductAddPage implements OnInit {
  productForm!: FormGroup;
  producto: ClProducto = new ClProducto({
    idProducto: 0,
    nombreprod: 'Agrega tu Nuevo Producto',
    descripcion: 'Descripcion corta',
    precio: 0,
    fecha: new Date(),
    cantidad: 0,
    rut: 0,
    dv: '0',
    enfermedad: '0',
    fonocontacto: 0,
    categoria: '0',
    editorial: '0',
    raza: '0',
    edad: 0,
    altura: 0,
    hrini: '0',
    hrfin: '0',
    direccion: '0',
    fCreacion: new Date(),
  });

  constructor(private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private restApi: ProductServiceService,
    private router: Router) {}

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      "prod_name": [null, Validators.required], // Aquí debes asegurarte de que coincida con el nombre del campo en tu formulario
      'prod_desc': [null, Validators.required], // Asegúrate de que coincida con el nombre del campo en tu formulario
      'prod_price': [null, Validators.required], // Asegúrate de que coincida con el nombre del campo en tu formulario
      'prod_cantidad': [null, Validators.required], // Asegúrate de que coincida con el nombre del campo en tu formulario
    });
  }

  async onFormSubmit(form: NgForm) {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();

    await this.restApi.addProduct(this.producto)
      .subscribe({
        next: (res) => {
          loading.dismiss();
          if (res == null) {
            console.log("Next No Agrego, Res Null");
            return;
          }
          console.log("Next Agrego SIIIIII Router saltaré ;", this.router);
          this.router.navigate(['/product-list']);
        },
        complete: () => {},
        error: (err) => {
          console.log("Error AddProduct Página", err);
          loading.dismiss();
        }
      });
  }
}
