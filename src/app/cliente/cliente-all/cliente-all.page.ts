import { Component, OnInit } from '@angular/core';
import { ClCliente } from '../model/ClCliente';
@Component({
  selector: 'app-cliente-all',
  templateUrl: './cliente-all.page.html',
  styleUrls: ['./cliente-all.page.scss'],
})
export class ClienteAllPage implements OnInit {
  msgError = ""
  buttonEliminarDisabled = false
  buttonLeerDisabled = false
  buttonActualizarDisabled = false
  buttonCrearDisabled = false
  cliente: ClCliente = { id: 1, first_name: '', last_name: '', email: '', clave: '' };;

  constructor() { }
  ngOnInit() {  }
  public id: string = '';


  leer() {}
  eliminar() { }
  grabar() { }
  actualizar() { }
  grabarActualizarAutomatico() { }
}
