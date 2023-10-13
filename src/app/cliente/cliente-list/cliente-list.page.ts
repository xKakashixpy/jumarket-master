import { Component, OnInit } from '@angular/core';

// Importamos Librerías
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ClCliente } from '../model/ClCliente';
//import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ClienteService } from '../cliente-service.service';


@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.page.html',
  styleUrls: ['./cliente-list.page.scss'],
})
export class ClienteListPage implements OnInit {
  // Creamos la Variable para el Html
  clientes: ClCliente[] = [];
  // Injectamos Librerias
  constructor(public restApi: ClienteService
    , public loadingController: LoadingController
    , public router: Router) { }

  // LLamamos al método que rescata los clientes  
  ngOnInit() {
    this.getCliente();
  }

  // Método  que rescta los clientes
  async getCliente() {
    console.log("Entrando :getCliente");
    // Crea un Wait (Esperar)
    const loading = await this.loadingController.create({
      message: 'Harrys Loading...'
    });
    // Muestra el Wait
    await loading.present();
    console.log("Entrando :");
    // Obtiene el Observable del servicio
    await this.restApi.getClientes()
      .subscribe({
        next: (res) => { 
          console.log("Res:" + res);
  // Si funciona asigno el resultado al arreglo clientes
          this.clientes = res;
          console.log("thisClientes:",this.clientes);
          loading.dismiss();
        }
        , complete: () => { }
        , error: (err) => {
  // Si da error, imprimo en consola.
          console.log("Err:" + err);
          loading.dismiss();
        }
      })
  }


  
  // drop(event: CdkDragDrop<string[]>) {
  //   console.log("Moviendo Item Array Drop ***************:");
  //   moveItemInArray(this.productos, event.previousIndex, event.currentIndex);
  // }
}
