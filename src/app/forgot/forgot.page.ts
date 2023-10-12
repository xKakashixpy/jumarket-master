import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage {
  constructor(public alertController: AlertController) {}

  async showAlert() {
    const alert = await this.alertController.create({
      header: 'Hola',
      subHeader: 'Revisa tu Correo',
      message: 'Email de recuperación enviado',
      buttons: ['OK'],
    });

    await alert.present();

    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
      alert.dismiss();
    }, 3000);
  }
}
