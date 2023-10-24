import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';



@Injectable({
  providedIn: 'root'
})

export class PhotoService {

  constructor() { }


  public photos: UserPhoto[] = [];

  public async addNewToGallery() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    this.photos.unshift({
      filepath: "soon...",
      webviewPath: capturedPhoto.webPath!
    });
  }

}

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}