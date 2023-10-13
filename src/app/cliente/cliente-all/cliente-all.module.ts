import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClienteAllPageRoutingModule } from './cliente-all-routing.module';

import { ClienteAllPage } from './cliente-all.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClienteAllPageRoutingModule
  ],
  declarations: [ClienteAllPage]
})
export class ClienteAllPageModule {}
