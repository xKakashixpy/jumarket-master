import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-geolocalizacion',
  templateUrl: './geolocalizacion.page.html',
  styleUrls: ['./geolocalizacion.page.scss'],
})
export class GeolocalizacionPage {
  
  latitud!: number;
  longitud!: number;


  constructor() { }

  async obtenerCoordenadas(){
    const obtenerCoordenada=await Geolocation.getCurrentPosition();
    this.latitud=obtenerCoordenada.coords.latitude;
    this.longitud=obtenerCoordenada.coords.longitude;
  }

  ngOnInit() {
  }

}
