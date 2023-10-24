import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { defineCustomElements } from '@ionic/pwa-elements/loader';


@Component({
  selector: 'app-foto',
  templateUrl: './foto.page.html',
  styleUrls: ['./foto.page.scss'],
})
export class FotoPage implements OnInit {

  constructor(public photoService: PhotoService) { 
    
  }

  ngOnInit() {
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
}

