import { Component, OnInit } from '@angular/core';

// Imporamos librerías
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { ClCliente } from '../model/ClCliente';
import { ClienteService } from '../cliente-service.service';

@Component({
  selector: 'app-cliente-edit',
  templateUrl: './cliente-edit.page.html',
  styleUrls: ['./cliente-edit.page.scss'],
})
export class ClienteEditPage implements OnInit {
  // FormGroup para validaciones
  clienteForm!: FormGroup;
  // Esquema a utilizar en el Html
  cliente: ClCliente = { id: 1, first_name: '', last_name: '', email: '', clave:'' };
  id: any = '';
  //prod_name: string = '';
  //prod_desc: string = '';
  //prod_price:number=null;
  //prod_cantidad:number=null

  // Injectamos librerías
  constructor(public restApi: ClienteService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    console.log("ngOnInit ID:" + this.route.snapshot.params['id']);
    // Relizamos lectura
    this.getCliente(this.route.snapshot.params['id']);
    // Especificamos Validaciones por medio de FormGroup
    this.clienteForm = this.formBuilder.group({
      'cli_first_name': [null, Validators.required],
      'cli_last_name': [null, Validators.required],
      'cli_email': [null, Validators.required],
      'cli_clave': [null, Validators.required]
    });
  }
  async onFormSubmit(form: NgForm) {
    console.log("onFormSubmit ID:" + this.id)
    this.cliente.id = this.id;
    /*this.producto.nombre = form.prod_name;
    this.producto.descripcion = form.prod_desc;
    this.producto.precio = form.prod_price;
    this.producto.cantidad = form.prod_cantidad;
    */
    // si envio form, envio los nombres del campo del formulario
    //await this.restApi.updateProduct(this.id, form)
    await this.restApi.updateCliente(this.id, this.cliente)
      .subscribe({
        next: (res) => {
          let id = res['id'];
          //this.router.navigate([ 'detail', { outlets: { details: id }} ]);
          this.router.navigate(['/cliente-detail/' + this.id]);
        }
        , complete: () => { }
        , error: (err) => { console.log(err); }
      })

  }

  // Método que permite leer el producto
  async getCliente(id: number) {
    // Crea Wait
      const loading = await this.loadingController.create({
        message: 'Loading...'
      });
      // Muestra Wait
      await loading.present();
      // Obtiene el Observable
      await this.restApi.getCliente(id + "")
        .subscribe({
          next: (data) => {
            console.log("getClienteID data****");
            console.log(data);
            // Si funciona Rescata el los datos
            this.id = data.id;
            // Actualiza los datos
            this.clienteForm.setValue({
              cli_first_name: data.first_name,
              cli_last_name: data.last_name,
              cli_email: data.email,
              cli_clave: data.clave
            });
            loading.dismiss();
          }
          , complete: () => { }
          , error: (err) => {
            console.log("getClienteId Errr****+");
            console.log(err);
            loading.dismiss();
          }
        })
    }
  

 // Método que actualiza el producto por medio de submit
  async presentAlertConfirm(msg: string) {
    const alert = await this.alertController.create({
      header: 'Warning!',
      message: msg,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            //Si funciona el actualizar navega a listar
            this.router.navigate(['/cliente-list/']);
          }
        }
      ]
    });
    await alert.present();
  }

}
