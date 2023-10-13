import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ClCliente } from '../model/ClCliente';

import { ClienteService } from '../cliente-service.service';


@Component({
  selector: 'app-cliente-add',
  templateUrl: './cliente-add.page.html',
  styleUrls: ['./cliente-add.page.scss'],
})
export class ClienteAddPage implements OnInit {
  //Creamos una variable del tipo FormGroup
  // ! ==> Con esto le decimos a TS, que sabemos que la variable no esta inicializada
  //          y que estamos seguro que cuando se ejecute no será null
  clienteForm!: FormGroup;
  // Generalmente se usa una interface, sin embargo para jugar utilizaremos  una clase
  cliente: ClCliente = {
    id: 1523
    , first_name: 'Harrys el Magnifico'
    , last_name: 'Harrys el Magnifico'
    , email: 'Harrys el Magnifico'
    , clave: '****'
  };

  // Injectamos FormBuilder, el cual nos permitirá realizar validaciones                         
  constructor(private formBuilder: FormBuilder,
    // Injectamos las librerías necesarias
    private loadingController: LoadingController,
    private restApi: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  // Antes que inicie en pantalla
  // especificamos las validaciones, 
  //    por medio de formBuilder injectado en el constructor
  ngOnInit() {
    // Especificamos que todos los campos son obligatorios
    this.clienteForm = this.formBuilder.group({
      'cli_first_name': [null, Validators.required],
      'cli_last_name': [null, Validators.required],
      'cli_email': [null, Validators.required],
      'cli_clave': [null, Validators.required]
    });
  }
  // se ejecutará cuando presione el Submit
  async onFormSubmit(form: NgForm) {
    console.log("onFormSubmit del cliente ADD")

    // Creamos un Loading Controller, Ojo no lo muestra
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    // Muestra el Loading Controller
    await loading.present();

    // Ejecuta el método del servicio y los suscribe
    await this.restApi.addCliente(this.cliente)
      .subscribe({
        next: (res) => {
          console.log("Next addCliente Page",res)
          loading.dismiss(); //Elimina la espera
          if (res== null){ // No viene respuesta del registro
            console.log("Next No Agrego, Ress Null ");
            return
          }
          // Si viene respuesta
          console.log("Next Agrego SIIIIII Router saltaré ;",this.router);
          this.router.navigate(['/cliente-list']);
        }
        , complete: () => { }
        , error: (err) => {
          console.log("Error AddCliente Página",err);
          loading.dismiss(); //Elimina la espera
        }
      });
    console.log("Observe que todo lo del suscribe sale después de este mensaje")
  }

}
